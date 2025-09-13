import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { readStorage, writeStorage } from '../../utils/storage';

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
        const rawItems = readStorage('cart') || [];
        // Normalize stored items: prefer `id`, fallback from `_id`, ensure expected fields
        const items = rawItems.map(it => {
            const id = it.id || it._id || it.productId || null;
            const rawSelectedSize = it.selectedSize || it.size || '';
            const normalizedSelectedSize = Array.isArray(rawSelectedSize) ? rawSelectedSize.join(',') : String(rawSelectedSize || '');
            const rawSelectedColor = it.selectedColor || it.color || '';
            const normalizedSelectedColor = Array.isArray(rawSelectedColor) ? rawSelectedColor.join(',') : String(rawSelectedColor || '');
            return {
                id,
                _id: it._id || it.id || null,
                name: it.name || it.productName || '',
                price: typeof it.price === 'number' ? it.price : parseFloat(it.price) || 0,
                photos: it.photos || it.images || [],
                image: it.image || null,
                selectedSize: normalizedSelectedSize,
                selectedColor: normalizedSelectedColor,
                quantity: typeof it.quantity === 'number' ? it.quantity : parseInt(it.quantity, 10) || 1,
                totalPrice: typeof it.totalPrice === 'number' ? it.totalPrice : ((typeof it.price === 'number' ? it.price : parseFloat(it.price) || 0) * (typeof it.quantity === 'number' ? it.quantity : parseInt(it.quantity, 10) || 1)),
                addedAt: it.addedAt || new Date().toISOString(),
            };
        });

        return {
            items,
            totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
            totalAmount: items.reduce((total, item) => total + item.totalPrice, 0),
            loading: false,
            error: null,
        };
    })(),
    reducers: {
        // Helper to normalize size/color values into canonical string form
        _normalizeVal: (value) => {
            if (Array.isArray(value)) return value.join(',');
            if (value === null || value === undefined) return '';
            return String(value);
        },
        addToCart: (state, action) => {
            const newItemRaw = action.payload;
            const normalizedSize = Array.isArray(newItemRaw.selectedSize) ? newItemRaw.selectedSize.join(',') : String(newItemRaw.selectedSize || '');
            const newItem = {...newItemRaw, selectedSize: normalizedSize };

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
            writeStorage('cart', state.items);
        },

        removeFromCart: (state, action) => {
            const { id } = action.payload;
            const rawSelectedSize = action.payload.selectedSize;
            const selectedSize = Array.isArray(rawSelectedSize) ? rawSelectedSize.join(',') : String(rawSelectedSize || '');
            console.log('🗑️ removeFromCart called with:', { id, selectedSize });
            console.log('📦 Current cart items before removal:', state.items.map(item => ({ id: item.id, selectedSize: item.selectedSize, name: item.name })));

            const initialLength = state.items.length;
            state.items = state.items.filter(item =>
                !(item.id === id && item.selectedSize === selectedSize)
            );
            const finalLength = state.items.length;

            console.log(`✅ Items before: ${initialLength}, after: ${finalLength}, removed: ${initialLength - finalLength}`);

            // Recalculate totals
            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

            // Force immediate localStorage persistence
            writeStorage('cart', state.items);

            // Also persist to user-specific cart if logged in
            // writeStorage already persists to a user-specific key when a user is present
            // so no direct localStorage writes are necessary here.
        },

        updateQuantity: (state, action) => {
            const { id } = action.payload;
            const rawSelectedSize = action.payload.selectedSize;
            const selectedSize = Array.isArray(rawSelectedSize) ? rawSelectedSize.join(',') : String(rawSelectedSize || '');
            const quantity = action.payload.quantity;
            console.log('🔢 updateQuantity called with:', { id, selectedSize, quantity });
            console.log('📦 Current cart items before update:', state.items.map(item => ({ id: item.id, selectedSize: item.selectedSize, quantity: item.quantity, name: item.name })));

            const item = state.items.find(item =>
                item.id === id && item.selectedSize === selectedSize
            );

            if (item) {
                console.log('✅ Found item to update:', { name: item.name, currentQty: item.quantity, newQty: quantity });
                if (quantity <= 0) {
                    console.log('🗑️ Quantity is 0 or less, removing item');
                    state.items = state.items.filter(item =>
                        !(item.id === id && item.selectedSize === selectedSize)
                    );
                } else {
                    console.log('📈 Updating quantity from', item.quantity, 'to', quantity);
                    item.quantity = quantity;
                    item.totalPrice = quantity * item.price;
                }
            } else {
                console.log('❌ Item not found for update');
            }

            state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);

            console.log('📊 New totals - quantity:', state.totalQuantity, 'amount:', state.totalAmount);

            // Force immediate localStorage persistence
            writeStorage('cart', state.items);

            // Also persist to user-specific cart if logged in
            // writeStorage already persists to the appropriate user-specific key via getStorageKey
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            // Persist cart to localStorage
            writeStorage('cart', state.items);
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