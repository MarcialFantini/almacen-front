import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slice/theme/theme";
import { LoginReducer } from "./slice/login/login";
import { productReducer } from "./slice/products/product";

export const store = configureStore({
  reducer: { themeReducer, LoginReducer, productReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
