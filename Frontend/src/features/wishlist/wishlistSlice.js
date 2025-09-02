import { createSlice } from '@reduxjs/toolkit';
import { readStorage, writeStorage } from '../../utils/storage';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: (() => {
        const items = readStorage('wishlist') || [];
        return { items };
    })(),
    reducers: {
        addToWishlist: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    addedAt: new Date().toISOString(),
                });
            }
            // Persist wishlist to localStorage
            writeStorage('wishlist', state.items);
        },
        removeFromWishlist: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            // Persist wishlist to localStorage
            writeStorage('wishlist', state.items);
        },
        moveToCart: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            // Persist wishlist to localStorage
            writeStorage('wishlist', state.items);
        },
        clearWishlist: (state) => {
            state.items = [];
            // Persist wishlist to localStorage
            writeStorage('wishlist', state.items);
        },
    },
});

export const {
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;