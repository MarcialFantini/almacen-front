import { createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAdmin,
  getUserAdmin,
  setUsersAdmin,
  updateUserAdmin,
} from "./action";

export interface ResponseUsersGet {
  data: Users[];
  message: string;
  code: number;
}

export interface Users {
  id: string;
  name: string;
  lastName: string;
  email: string;

  isDeleted: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UsersReducer {
  users: Users[];
  userUpdate: Users;
}

const initialState: UsersReducer = {
  users: [],
  userUpdate: {
    id: "",
    name: "",
    lastName: "",
    email: "",
    isDeleted: false,
    role: "",
    createdAt: "",
    updatedAt: "",
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUsersAdmin.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(deleteUserAdmin.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    });

    builder.addCase(updateUserAdmin.fulfilled, (state, action) => {});
    builder.addCase(getUserAdmin.fulfilled, (state, action) => {
      state.userUpdate = action.payload;
    });
  },
});

export const {} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
