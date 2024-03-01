import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { BrandsSchema } from '../types/brands';
import { fetchBrands } from '../services/fetchBrands/fetchBrands';

// Начальное состояние хранилища продуктов
const initialState: BrandsSchema = [];

export const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
         builder
            .addCase(fetchBrands.fulfilled, (_, action: PayloadAction<BrandsSchema>) => { // Действие при успешном выполнении запроса
                return action.payload;
            })
    },
});

export const { actions: brandsActions, reducer: brandsReducer } = brandsSlice;