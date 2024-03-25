import { createAsyncThunk } from "@reduxjs/toolkit";

export interface OrderOne {
  product_id: string;
  amount: number;
}
export interface CreateOrderInterface {
  name: string;
  amount: number;
  product_id: string;
  price: number;
}

export interface responseCreateOrder {
  data: dataCreateOrder;
  message: string;
  code: number;
}

export interface dataCreateOrder {
  clientSecret: string;
}

export const crearOrdenThunk = createAsyncThunk(
  "createOrden/user",
  async (
    { token, order }: { token: string; order: CreateOrderInterface[] },
    thunkApi
  ) => {
    try {
      console.log(order);
      const response = await fetch(
        "http://localhost:5000/api/v1/orders/create",
        {
          body: JSON.stringify({ order }),
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = (await response.json()) as responseCreateOrder;

      if (data.code !== 200) {
        return thunkApi.rejectWithValue({ error: "error: " + data.message });
      }

      return data.data.clientSecret;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
