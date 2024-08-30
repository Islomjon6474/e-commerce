import {createAsyncThunk} from "@reduxjs/toolkit";
import {Product} from "@/types";
import {RootState} from "@/store";

export const fetchProducts = createAsyncThunk<Product[], void, {
    state: RootState,
    rejectValue: string
}>(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/Islomjon6474/e-commerce-data/db');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products: Product[] = await response.json();
            console.log('Fetched Products:', products)
            return products;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);
