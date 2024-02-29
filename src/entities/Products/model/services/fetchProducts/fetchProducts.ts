import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { ProductIdsSchema, ProductType, ProductsSchema } from "../../types/products";
import { paginationActions } from "entities/Pagination";

interface ParamsSchema  {
    offset?: number;
    limit?: number;
    price?: number;
    brand?: string;
    product?: string;
}

const MAX_RETRY_COUNT = 3; // Максимальное количество попыток повтора запроса в случае ошибки

const fetchProducts = createAsyncThunk<ProductsSchema, ParamsSchema, ThunkConfig<string>>(
    'products/fetchProducts',
    async (params, {extra, rejectWithValue, dispatch}) => {
        let retryCount = 0; // Счетчик попыток повтора запроса
        while (retryCount < MAX_RETRY_COUNT) {
            try {
                let productIdsPayload;
                let isFiltered = false; // Флаг, указывающий на то, был ли запрос отфильтрован

                // Определение payload в зависимости от того, нужно ли фильтровать запрос или нет
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
                // Запрос на получение идентификаторов продуктов
                const productIdsResponse = await extra.api.post<ProductIdsSchema>('', productIdsPayload);
                const productIds = productIdsResponse.data.result;
    
                // Подготовка payload для запроса товаров
                const payload = {
                    action: "get_items",
                    params: {
                        ids: productIds
                    }
                };

                // Запрос на получение товаров
                const response = await extra.api.post<ProductsSchema>('', payload); 
                const uniqueIds = new Set();
                
                // Фильтрация дубликатов товаров
                const products: Array<ProductType> = response.data.result.filter((obj: ProductType) => {
                    if (uniqueIds.has(obj.id)) {
                        return false;
                    } else {
                        uniqueIds.add(obj.id);
                        return true;
                    }
                });

                if (!isFiltered && (productIds.length < __PAGE_LENGTH__)) {
                    dispatch(paginationActions.setLastPage(true));
                }

                const productsResponse: ProductsSchema = {
                    result: products,
                    isLoaded: true,
                    isFiltered
                };
                return productsResponse;
            } catch(e) {
                console.error(e);
                retryCount++;
                if (retryCount === MAX_RETRY_COUNT) {
                    return rejectWithValue(e.message);
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
)

export {fetchProducts};