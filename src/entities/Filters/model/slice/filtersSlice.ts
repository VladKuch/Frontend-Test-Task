import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { FiltersSchema } from '../types/filters';

const initialState: FiltersSchema = {};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        resetFilters: (state) => {
            return {};
        },
        setFilters: (state, action: PayloadAction<FiltersSchema>) => {
            return {...state, ...action.payload}
        }
    },
    extraReducers: (builder) => {},
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;