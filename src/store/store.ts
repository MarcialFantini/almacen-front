import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slice/theme/theme";
import { LoginReducer } from "./slice/login/login";
import { productReducer } from "./slice/products/product";
import { CarReducer } from "./slice/car/car";

export const store = configureStore({
  reducer: { themeReducer, LoginReducer, productReducer, CarReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
