import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: (() => {
        const user = JSON.parse(localStorage.getItem('user'));
        let items = [];
        if (user && user.emailOrPhone) {
            const wishlistKey = `wishlist_${user.emailOrPhone}`;
            const savedWishlist = localStorage.getItem(wishlistKey);
            if (savedWishlist) {
                try {
                    items = JSON.parse(savedWishlist);
                } catch {}
            }
        }
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
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            // Persist wishlist to localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state.items));
            }
        },
        moveToCart: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            // Persist wishlist to localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state.items));
            }
        },
        clearWishlist: (state) => {
            state.items = [];
            // Persist wishlist to localStorage
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(state.items));
            }
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