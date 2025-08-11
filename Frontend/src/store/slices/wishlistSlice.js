import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching user's wishlist from API
export const fetchUserWishlist = createAsyncThunk(
  'wishlist/fetchUserWishlist',
  async (userId) => {
    // Simulate API call
    const response = await new Promise(resolve => 
      setTimeout(() => resolve([]), 500)
    );
    return response;
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
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
    },

    removeFromWishlist: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },

    clearWishlist: (state) => {
      state.items = [];
    },

    moveToCart: (state, action) => {
      const { id } = action.payload;
      // This will be handled by the cart slice when the item is added
      // We just remove it from wishlist
      state.items = state.items.filter(item => item.id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  moveToCart,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
