import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ResponseManyProducts } from "./product";

const instanceAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const setProductsHome = createAsyncThunk(
  "getProducts/home",
  async ({ page, offset }: { page: number; offset: number }) => {
    try {
      const responseData = (await instanceAxios.get(
        `products/page/${page}/offset/${offset}`
      )) as AxiosResponse<ResponseManyProducts, any>;

      if (responseData.status !== 200) {
        return "";
      }
    } catch (error) {}
  }
);
