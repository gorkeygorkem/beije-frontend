// src/store/slices/productSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProductsAndPackets } from '@/lib/api';

export interface SubProduct {
  _id: string;
  name: string;
  price: number;
}

export interface Product {
  _id: string;
  title: string;
  image: string;
  type: string;
  subProducts: SubProduct[];
}

interface Packet {
  _id: string;
  title: string;
  image: string;
}

interface ProductState {
  products: Product[];
  packets: Packet[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductState = {
  products: [],
  packets: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products and packets
export const fetchProductsAndPackets = createAsyncThunk(
  'products/fetchProductsAndPackets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsAndPackets();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts(state) {
      state.products = [];
      state.packets = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAndPackets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAndPackets.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.packets = action.payload.packets;
      })
      .addCase(fetchProductsAndPackets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
