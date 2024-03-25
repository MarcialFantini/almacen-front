import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const instanceAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

//Authorization: `Bearer ${token?token:""}`,

export interface UserInterface {
  name: string;
  lastName: string;
  password: string;
  email: string;
}

export interface UserCreateResponse {
  data: {
    token: string;
    isAdmin: boolean;
  };
  message: string;
  code: number;
}

interface LoginInterface {
  password: string;
  email: string;
}

export const createUserActionThunk = createAsyncThunk(
  "createUser/fetchLogin",
  async (body: UserInterface, thunkApi) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/create",
        {
          body: await JSON.stringify(body),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.status !== 201) {
        return thunkApi.rejectWithValue("error to create user");
      }

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface responseData {
  token: string;
  isAdmin: boolean;
}

export const loginUserToken = createAsyncThunk(
  "login/fetchLogin",

  async (body: LoginInterface, thunkApi) => {
    try {
      const response = await instanceAxios.post("/login/create", body);

      if (response.data.code !== 200) {
        return thunkApi.rejectWithValue("error to login");
      }
      console.log(response.data);
      return response.data.data as responseData;
    } catch (error) {
      return thunkApi.rejectWithValue("error to login");
    }
  }
);
