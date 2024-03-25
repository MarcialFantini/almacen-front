import { createSlice } from "@reduxjs/toolkit";
import { getOrdersGraphics, getProductsCategoryCount } from "./action";
export interface ProductsCountCategoryResponse {
  data: ProductsCountCategory[];
  code: number;
}

export interface ProductsCountCategory {
  category: string;
  cantidad: string;
}

export interface OrdersGraphic {
  id: string;
  amount: number;
  createdAt: string;
}
export interface graphicsState {
  orders: OrdersGraphic[];
  products: ProductsCountCategory[];
}

const initialState: graphicsState = {
  orders: [],
  products: [],
};

const OrdersGraphicSlice = createSlice({
  name: "ordersGraphic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersGraphics.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getProductsCategoryCount.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const {} = OrdersGraphicSlice.actions;

export const OrdersGraphicReducer = OrdersGraphicSlice.reducer;
