import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    brand: string;
    thumbnail: string;
    images: string[];
  }
  
interface SearchState {
    searchValue: string;
    products: Product[];
    pages: number;
    scrollPosition: number;
}

const initialState: SearchState = {
    searchValue: '',
    products: [],
    pages: 10,
    scrollPosition: 0,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValueAndScrollPosition(state, action: PayloadAction<{searchValue: string; products: Product[]; pages: number; scrollPosition: number}>) {
            state.searchValue = action.payload.searchValue;
            state.products = action.payload.products;
            state.pages = action.payload.pages;
            state.scrollPosition = action.payload.scrollPosition;
        },
    },
});

export const { setSearchValueAndScrollPosition } = searchSlice.actions;

export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;