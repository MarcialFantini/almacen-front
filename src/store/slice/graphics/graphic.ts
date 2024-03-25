import { createSlice } from "@reduxjs/toolkit";
import { getOrdersGraphics } from "./action";

export interface OrdersGraphic {
  id: string;
  amount: number;
  createdAt: string;
}
export interface graphicsState {
  orders: OrdersGraphic[];
}

const initialState: graphicsState = {
  orders: [],
};

const OrdersGraphicSlice = createSlice({
  name: "ordersGraphic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersGraphics.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  },
});

export const {} = OrdersGraphicSlice.actions;

export const OrdersGraphicReducer = OrdersGraphicSlice.reducer;
