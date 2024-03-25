import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { crearOrdenThunk } from "./action";

export enum OrdersStatus {
  pending = "pending",
  complete = "complete",
  inert = "inert",
}

interface ProductCar {
  products: Product[];
  clientSecret: string | null;
  ordersSendStatus: OrdersStatus;
}

interface Product {
  id: string;
  amount: number;
  price: number;
  name: string;
}

const initialState: ProductCar = {
  products: [],
  clientSecret: null,
  ordersSendStatus: OrdersStatus.inert,
};

export const CarSlice = createSlice({
  name: "Car",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const newProduct: Product = { ...action.payload };
      const idProduct = state.products.findIndex(
        (state) => state.id === action.payload.id
      );

      if (idProduct !== -1) {
        state.products[idProduct].amount = state.products[idProduct].amount + 1;
      } else {
        newProduct.amount = 1;
        state.products = [...state.products, newProduct];
      }
    },

    addOneProduct: (state, action: PayloadAction<string>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );

      state.products[index].amount = state.products[index].amount + 1;
    },
    delProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const productSelected = state.products.findIndex(
        (product) => action.payload.id === product.id
      );

      state.products[productSelected] = { ...action.payload };
    },

    resetCar: (state, action: PayloadAction<OrdersStatus>) => {
      state.products = [];
      state.ordersSendStatus = action.payload;
      state.clientSecret = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(crearOrdenThunk.fulfilled, (state, action) => {
      state.ordersSendStatus = OrdersStatus.complete;
      state.clientSecret = action.payload;
    });
    builder.addCase(crearOrdenThunk.pending, (state, action) => {
      state.ordersSendStatus = OrdersStatus.pending;
    });
  },
});

export const {
  addOneProduct,
  addProduct,
  updateProduct,
  delProduct,
  resetCar,
} = CarSlice.actions;

export const CarReducer = CarSlice.reducer;
