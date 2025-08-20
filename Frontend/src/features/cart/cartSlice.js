import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching user's cart from API
export const fetchUserCart = createAsyncThunk(
    'cart/fetchUserCart',
    async(userId) => {
        // Simulate API call
        const response = await new Promise(resolve =>
            setTimeout(() => resolve([]), 500)
        );
        return response;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: (() => {
        const user = JSON.parse(localStorage.getItem('user'));
        let items = [];
        if (user && user.emailOrPhone) {
            const cartKey = `cart_${user.emailOrPhone}`;
            const savedCart = localStorage.getItem(cartKey);
            if (savedCart) {
                try {
                    items = JSON.parse(savedCart);
                } catch {}
            }
        }
        return {
            items,
            totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
            totalAmount: items.reduce((total, item) => total + item.totalPrice, 0),
            loading: false,
            error: null,
        };
    })(),
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item =>
                item.id === newItem.id && item.selectedSize === newItem.selectedSize
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                state.items.push({
                    ...newItem,
                    totalPrice: newItem.quantity * newItem.price,
                    addedAt: new Date().toISOString(),
                });
            }

            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
            // Persist cart to localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },

        removeFromCart: (state, action) => {
            const { id, selectedSize } = action.payload;
            state.items = state.items.filter(item =>
                !(item.id === id && item.selectedSize === selectedSize)
            );
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
            // Persist cart to localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },

        updateQuantity: (state, action) => {
            const { id, selectedSize, quantity } = action.payload;
            const item = state.items.find(item =>
                item.id === id && item.selectedSize === selectedSize
            );

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(item =>
                        !(item.id === id && item.selectedSize === selectedSize)
                    );
                } else {
                    item.quantity = quantity;
                    item.totalPrice = quantity * item.price;
                }
            }

            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
            // Persist cart to localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            // Persist cart to localStorage
            localStorage.setItem('cart', JSON.stringify(state.items));
        },

        setSelectedSize: (state, action) => {
            const { id, selectedSize } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.selectedSize = selectedSize;
            }
        },

        setSelectedColor: (state, action) => {
            const { id, selectedColor } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.selectedColor = selectedColor;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
                state.totalAmount = action.payload.reduce((total, item) => total + item.totalPrice, 0);
            })
            .addCase(fetchUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setSelectedSize,
    setSelectedColor,
} = cartSlice.actions;

export default cartSlice.reducer;