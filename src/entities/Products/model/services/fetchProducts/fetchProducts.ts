import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { ProductIdsSchema, ProductType, ProductsSchema } from "../../types/products";
import { ids } from "webpack";
import { paginationActions } from "entities/Pagination";

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
    async (params, {extra, rejectWithValue, dispatch}) => {
        try {
            let productIdsPayload;
            let isFiltered = false;
            if ('price' in params || 'brand' in params || 'product' in params) {
                productIdsPayload = {
                    action: "filter",
                    params
                };
                isFiltered = true;
            } else {
                productIdsPayload = {
                    action: "get_ids",
                    params
                };
            }
            const productIdsResponse = await extra.api.post<ProductIdsSchema>('', productIdsPayload);
            const productIds = productIdsResponse.data.result;

            if (!isFiltered && (productIds.length < __PAGE_LENGTH__)) {
                dispatch(paginationActions.setLastPage(true));
            }
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
                isFiltered
            };
            return productsResponse;
        } catch(e) {
            console.error(e);
            return rejectWithValue(e.message);
        }
    }
)

export {fetchProducts};