import { createSlice } from "@reduxjs/toolkit";
import {
  Orders,
  OrdersDeleteThunk,
  OrdersGetOneThunk,
  OrdersGetThunk,
} from "./action";

interface OrdersState {
  ordersAdminTable: Orders[];
  orderUpdate: Orders;
}

const initialState: OrdersState = {
  ordersAdminTable: [],
  orderUpdate: {
    id: "",
    amount: 0,
    User: {
      name: "",
      email: "",
    },
    Product: {
      name: "",
      price: 0,
    },
  },
};

const OrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(OrdersGetThunk.fulfilled, (state, action) => {
      state.ordersAdminTable = action.payload;
    });

    builder.addCase(OrdersGetOneThunk.fulfilled, (state, action) => {
      state.orderUpdate = action.payload;
    });
    builder.addCase(OrdersDeleteThunk.fulfilled, (state, action) => {
      state.ordersAdminTable = state.ordersAdminTable.filter(
        (product) => product.id !== action.meta.arg.id
      );
    });
  },
});

export const OrdersReducer = OrdersSlice.reducer;

export const {} = OrdersSlice.actions;
