import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    incrementCart(state) {
      state.count += 1;
    },
    resetCart(state) {
      state.count = 0;
    },
  },
});

export const { incrementCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
