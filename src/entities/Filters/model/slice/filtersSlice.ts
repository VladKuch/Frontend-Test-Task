import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { FiltersSchema } from '../types/filters';

const initialState: FiltersSchema = {};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        resetFilters: () => {
            return {};
        },
        setFilters: (_, action: PayloadAction<FiltersSchema>) => {
            return {...action.payload}
        }
    }
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;