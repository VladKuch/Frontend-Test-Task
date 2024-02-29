import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetchProducts/fetchProducts';
import { ProductsSchema } from '../types/products';

// Начальное состояние хранилища продуктов
const initialState: ProductsSchema = {
    result: [],
    isLoaded: false,
    isFiltered: false,
    error: ''
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
         builder
            .addCase(fetchProducts.pending, (state) => { // Действие при ожидании запроса
                state.isLoaded = false; // Устанавливаем флаг загрузки в состояние "ожидание"
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsSchema>) => { // Действие при успешном выполнении запроса
                state.result = action.payload.result;
                state.isLoaded = action.payload.isLoaded;
                state.isFiltered = action.payload.isFiltered;
            })
            .addCase(fetchProducts.rejected, (state, action) => { // Действие при неудачном выполнении запроса
                state.error = action.payload as string;
                state.isLoaded = true;
            })
    },
});

export const { actions: productsActions, reducer: productsReducer } = productsSlice;