import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ResponseOrdersGraphics {
  code: number;
  message: string;
  data: Data;
}

export interface Data {
  orders: Order[];
}

export interface Order {
  id: string;
  amount: number;
  createdAt: string;
}

export const getOrdersGraphics = createAsyncThunk(
  "getOrdersGraphics/admin",
  async (none: "", thunk) => {
    try {
      const responseData = await fetch(
        "http://localhost:5000/api/v1/orders/graphic"
      );

      const data: ResponseOrdersGraphics = await responseData.json();

      if (data.data.orders.length === 0) {
        return thunk.rejectWithValue([]);
      }

      return data.data.orders;
    } catch (error) {
      return thunk.rejectWithValue([]);
    }
  }
);
