import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ResponseOrdersGet {
  code: number;
  message: string;
  data: Orders[];
}

export interface Orders {
  id: string;
  amount: number;
  User: User;
  Product: ProductOrders;
}

export interface User {
  name: string;
  email: string;
}

export interface ProductOrders {
  name: string;
  price: number;
}

export const OrdersGetThunk = createAsyncThunk(
  "getOrders/admin",
  async (
    { page, offset, token }: { page: number; offset: number; token: string },
    thunkApi
  ) => {
    try {
      const responseOrders = await fetch(
        `http://localhost:5000/api/v1/orders/page/${page}/offset/${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orders: ResponseOrdersGet = await responseOrders.json();

      if (orders.code !== 200) {
        return thunkApi.rejectWithValue(orders.message);
      }

      return orders.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export interface ResponseOrdersGetOne {
  code: number;
  message: string;
  data: Orders;
}

export const OrdersGetOneThunk = createAsyncThunk(
  "getOrderOne/admin",
  async ({ id, token }: { id: string; token: string }, thunkApi) => {
    try {
      const responseOrder = await fetch(
        "http://localhost:5000/api/v1/orders/one/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: ResponseOrdersGetOne = await responseOrder.json();

      if (responseOrder.status !== 200) {
        return thunkApi.rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const OrdersDeleteThunk = createAsyncThunk(
  "deleteOrder/admin",
  async ({ id, token }: { id: string; token: string }, thunkApi) => {
    try {
      const responseOrder = await fetch(
        "http://localhost:5000/api/v1/orders/delete/" + id,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await responseOrder.json();

      if (responseOrder.status !== 200) {
        return thunkApi.rejectWithValue(data.message);
      }

      return true;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
