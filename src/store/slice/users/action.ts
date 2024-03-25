import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseUsersGet } from "./users";

export const setUsersAdmin = createAsyncThunk(
  "setUsers/admin",
  async (token: string, thunkApi) => {
    try {
      const responseUsers = await fetch(
        "http://localhost:5000/api/v1/users/page/0/offset/20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: ResponseUsersGet = await responseUsers.json();

      if (data.code !== 200) {
        return thunkApi.rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteUserAdmin = createAsyncThunk(
  "userDelete/admin",
  async ({ token, id }: { token: string; id: string }, thunkApi) => {
    try {
      const responseUsers = await fetch(
        "http://localhost:5000/api/v1/users/delete/" + id,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data: ResponseUsersGet = await responseUsers.json();

      if (data.code !== 200) {
        return thunkApi.rejectWithValue(data.message);
      }

      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export interface updateUserInterface {
  name: string;
  lastName: string;
  role: string;
  email: string;
}

export interface UpdateUserResponse {
  data: number[];
  message: string;
  code: number;
}

export interface GetUserAdmin {
  data: User;
  message: string;
  code: number;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  isDeleted: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const getUserAdmin = createAsyncThunk(
  "setUpdateUser/admin",
  async ({ token, id }: { token: string; id: string }, thunkApi) => {
    try {
      const responseUsers = await fetch(
        "http://localhost:5000/api/v1/users/one/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataResponse: GetUserAdmin = await responseUsers.json();

      if (dataResponse.code !== 200) {
        return thunkApi.rejectWithValue(dataResponse.message);
      }
      return dataResponse.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateUserAdmin = createAsyncThunk(
  "updateUser/admin",
  async (
    {
      token,
      update,
      id,
    }: { token: string; update: updateUserInterface; id: string },
    thunkApi
  ) => {
    try {
      console.log({ token, update, id });
      console.log("http://localhost:5000/api/v1/users/update/" + id);
      const response = await fetch(
        "http://localhost:5000/api/v1/users/update/" + id,
        {
          method: "PATCH",
          body: await JSON.stringify(update),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data: UpdateUserResponse = await response.json();
      console.log(data);
      if (response.status !== 200) {
        return thunkApi.rejectWithValue(data.message);
      }

      return data.message;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
