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

export interface ProductResponse {
  data: ProductCreated;
  code: number;
  message: string;
}

export interface ProductCreated {
  id: string;
  isDeleted: boolean;
  isCompleted: boolean;
  name: string;
  amount: number;
  price: number;
  updatedAt: string;
  createdAt: string;
}

export const setProductsHome = createAsyncThunk(
  "getProducts/home",
  async (
    {
      page,
      offset,
      category,
    }: { page: number; offset: number; category?: string },
    thunkApi
  ) => {
    try {
      let route = `products/page/${page}/offset/${offset}`;
      let routeFinal = route;

      if (category) {
        routeFinal = route + `/${category}`;
      }

      const responseData = (await instanceAxios.get(
        routeFinal
      )) as AxiosResponse<ResponseManyProducts, any>;
      console.log(responseData);
      if (responseData.status !== 200) {
        return thunkApi.rejectWithValue([]);
      }

      return responseData.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue([]);
    }
  }
);

export const setProductsAdmin = createAsyncThunk(
  "getPrducts/admin",
  async ({ page, offset }: { page: number; offset: number }, thunkApi) => {
    try {
      const responseData = await fetch(
        `http://localhost:5000/api/v1/products/page/${page}/offset/${offset}`,
        { cache: "no-cache" }
      );

      const data = await responseData.json();

      if (responseData.status !== 200) {
        return thunkApi.rejectWithValue([]);
      }
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const setProductsGallery = createAsyncThunk(
  "getProductsGallery/all",
  async (
    {
      page,
      offset,
      category,
    }: { page: number; offset: number; category?: string },
    thunkApi
  ) => {
    try {
      let url = `products/page/${page}/offset/${offset}`;
      let urlFinal = url;

      if (category) {
        urlFinal = urlFinal + `/${category}`;
      }

      const responseData = (await instanceAxios.get(urlFinal)) as AxiosResponse<
        ResponseManyProducts,
        any
      >;

      if (responseData.status !== 200) {
        return thunkApi.rejectWithValue([]);
      }
      return responseData.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const setProductsGallerySearch = createAsyncThunk(
  "productSearch/all",
  async (search: string, thunkApi) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/products/search/" + search,
        {
          cache: "no-cache",
        }
      );

      const data: ResponseManyProducts = await response.json();

      if (data.code !== 200) {
        return thunkApi.rejectWithValue("error to get products");
      }

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export interface ProductCreateWhitImage {
  name: string;
  amount: number;
  price: number;
  category: string;
}

export const createProductAdmin = createAsyncThunk(
  "createProduct/admin",
  async (
    {
      body,
      token,
      images,
    }: { body: ProductCreateWhitImage; token: string; images: File[] },
    thunkApi
  ) => {
    try {
      const formDataSend = new FormData();
      formDataSend.append("name", body.name);
      formDataSend.append("amount", String(body.amount));
      formDataSend.append("price", String(body.price));
      formDataSend.append("category", body.category);
      images.forEach((image, index) => {
        formDataSend.append(`images`, image);
      });

      const response = await fetch(
        "http://localhost:5000/api/v1/products/create/image",
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataSend,
          cache: "no-cache",
        }
      );
      const data = await response.json();
      if (data.code !== 201) {
        return thunkApi.rejectWithValue("error to created product 201");
      }

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export interface ProductUpdate {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface ProductUpdateResponse {
  data: {
    name: string;
  };
  code: number;
  message: string;
}
export const ProductUpdate = createAsyncThunk(
  "productUpdate/admin",
  async (
    {
      formProduct,
      token,
    }: { formProduct: ProductUpdate; token: string | null },
    thunkApi
  ) => {
    try {
      const dataToSend = {
        name: formProduct.name,
        price: formProduct.price,
        amount: formProduct.amount,
      };

      const responseFetchProduct = await fetch(
        `http://localhost:5000/api/v1/products/update/` + formProduct.id,
        {
          method: "PATCH",
          body: JSON.stringify(dataToSend),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: ProductUpdateResponse = await responseFetchProduct.json();

      if (responseFetchProduct.status !== 200) {
        return thunkApi.rejectWithValue(data.message);
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error });
    }
  }
);

export const DeleteProduct = createAsyncThunk(
  "deleteProduct/admin",
  async ({ id, token }: { id: string; token: string }, thunkApi) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/products/delete/" + id,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(await response.json());

      if (response.status !== 200) {
        return thunkApi.rejectWithValue("error to deleted");
      }

      return;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
