import {createSlice, PayloadAction, SliceSelectors} from '@reduxjs/toolkit';
import {Product, ProductsState} from '@/types';
import {fetchProducts} from "@/lib/api";
import {expandProducts} from "@/utils";

const initialState: ProductsState = {
    products: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    productsPerPage: 10,
    totalProducts: 0,
    totalPages: 0,
};


const productSlice = createSlice<ProductsState, {}, "products", SliceSelectors<ProductsState>>({
    name: 'products',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setNumberOfPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.status = 'loading';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
            const { products } = action.payload;
            state.status = 'succeeded';
            state.products = expandProducts(products);
            state.totalProducts = products.length * 4;
            state.totalPages = Math.ceil(state.totalProducts / state.productsPerPage);
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
        });
    },
});

export const { setPage, setNumberOfPages } = productSlice.actions;
export default productSlice.reducer;
