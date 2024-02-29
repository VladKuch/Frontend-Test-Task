import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { ProductIdsSchema, ProductType, ProductsSchema } from "../../types/products";
import { ids } from "webpack";

interface ParamsSchema  {
    offset?: number;
    limit?: number;
    price?: number;
    brand?: string;
    product?: string;
}

const fetchProducts = createAsyncThunk<ProductsSchema, ParamsSchema, ThunkConfig<string>>(
    'products/fetchProducts',
    //@ts-ignore
    async (params, {extra, rejectWithValue}) => {
        try {
            let productIdsPayload;
            let totalCount;
            if ('price' in params || 'brand' in params || 'product' in params) {
                productIdsPayload = {
                    action: "filter",
                    params
                };
                totalCount = 0;
            } else {
                productIdsPayload = {
                    action: "get_ids",
                    params
                };
                const totalCountPayload = {
                    action: "get_ids"
                };
                const totalCountResponse = await extra.api.post<ProductIdsSchema>('', totalCountPayload);
                totalCount = totalCountResponse.data.result.length;
            }
            const productIdsResponse = await extra.api.post<ProductIdsSchema>('', productIdsPayload);
            const productIds = productIdsResponse.data.result;

            const payload = {
                action: "get_items",
                params: {
                    ids: productIds
                }
            };
            const response = await extra.api.post<ProductsSchema>('', payload); 
            const uniqueIds = new Set();
            const products: Array<ProductType> = response.data.result.filter((obj: ProductType) => {
                if (uniqueIds.has(obj.id)) {
                    return false;
                } else {
                    uniqueIds.add(obj.id);
                    return true;
                }
            });
            const productsResponse: ProductsSchema = {
                result: products,
                isLoaded: true,
                totalCount
            };
            return productsResponse;
        } catch(e) {
            console.error(e);
            return rejectWithValue(e.message);
        }
    }
)

export {fetchProducts};