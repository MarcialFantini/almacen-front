import { createSlice } from "@reduxjs/toolkit";

export interface ResponseManyProducts {
  data: Product[];
  message: string;
  code: number;
}

export interface Product {
  id: string;
  name: string;
  amount: number;
  price: number;
  ProductImages: ProductImage[];
}

export interface ProductImage {
  id: string;
}

export interface ProductsSlice {
  homeProducts: Product[];
  adminProducts: Product[];
}

const initialState: ProductsSlice = {
  homeProducts: [],
  adminProducts: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const {} = productSlice.actions;

export const productReducer = productSlice.reducer;
