import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { paginationActions } from "entities/Pagination";
import { BrandsSchema } from "../../types/brands";


const MAX_RETRY_COUNT = 3; // Максимальное количество попыток повтора запроса в случае ошибки

const fetchBrands = createAsyncThunk<BrandsSchema, null, ThunkConfig<string>>(
    'brands/fetchBrands',
    async (_, {extra, rejectWithValue, dispatch}) => {
        let retryCount = 0; // Счетчик попыток повтора запроса
        while (retryCount < MAX_RETRY_COUNT) {
            try {
                const payload = {
                    action: "get_fields",
                    params: {
                        field: "brand"
                    }
                };    
                const response = await extra.api.post('', payload); 
                const uniqueBrands = new Set<string>();
                // Фильтрация брендов, убрать null и дубликаты
                const brands: BrandsSchema = response.data.result.filter((brand: string | null) => {
                    if (brand == null) return false;

                    if (uniqueBrands.has(brand)) {
                        return false;
                    }

                    uniqueBrands.add(brand);
                    return true
                });

                return brands;
            } catch(e) {
                console.error(e);
                retryCount++;
                if (retryCount === MAX_RETRY_COUNT) {
                    return rejectWithValue(e.message);
                }
                // Повторный запрос через 1 сек.
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
)

export {fetchBrands};