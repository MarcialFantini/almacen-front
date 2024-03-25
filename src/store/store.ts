import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slice/theme/theme";
import { LoginReducer } from "./slice/login/login";
import { productReducer } from "./slice/products/product";
import { CarReducer } from "./slice/car/car";
import { usersReducer } from "./slice/users/users";
import { OrdersReducer } from "./slice/orders/orders";
import { OrdersGraphicReducer } from "./slice/graphics/graphic";

export const store = configureStore({
  reducer: {
    themeReducer,
    LoginReducer,
    productReducer,
    CarReducer,
    usersReducer,
    OrdersReducer,
    OrdersGraphicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
