import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import { PaginationSchema } from '../types/pagination';

const initialState: PaginationSchema = {
    currentPage: 1,
    isFirstPage: true,
    isLastPage: false
};

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setLastPage: (state, action: PayloadAction<boolean>) => {
            state.isLastPage = action.payload
        },
        setNextPage: (state) => {
            state.currentPage++;
            state.currentPage > 1 && state.isFirstPage && (state.isFirstPage = false);
        },
        setPrevPage: (state) => {
            state.currentPage--;
            state.currentPage == 1 && (state.isFirstPage = true);
            state.isLastPage == true && (state.isLastPage = false);
        }
    }
});

export const { actions: paginationActions, reducer: paginationReducer } = paginationSlice;