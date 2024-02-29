import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetchProducts/fetchProducts';
import { ProductType, ProductsSchema } from '../types/products';

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
            .addCase(fetchProducts.pending, (state) => {
                state.isLoaded = false;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductsSchema>) => {
                state.result = action.payload.result;
                state.isLoaded = action.payload.isLoaded;
                state.isFiltered = action.payload.isFiltered;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isLoaded = true;
            })
    },
});

export const { actions: productsActions, reducer: productsReducer } = productsSlice;