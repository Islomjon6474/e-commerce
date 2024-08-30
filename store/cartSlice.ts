import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface CartState {
    items: Product[];
    totalItems: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            state.items.push(action.payload);
            state.totalPrice += action.payload.price;
            state.totalItems++;
        },
        removeFromCart(state, action: PayloadAction<number>) {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.totalItems -= 1;
                state.totalPrice -= state.items[index].price;
                state.items.splice(index, 1);
            }
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
