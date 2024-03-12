import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProductCar {
  products: Product[];
}

interface Product {
  id: string;
  amount: number;
}

const initialState: ProductCar = {
  products: [],
};

export const CarSlice = createSlice({
  name: "Car",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
    },

    addOneProduct: (state, action: PayloadAction<string>) => {
      const productSelected = state.products.map((product) => {
        if (product.id === action.payload) {
          const updateProduct = { id: product.id, amount: product.amount + 1 };
          return updateProduct;
        }
        return { ...product };
      });

      state.products = productSelected;
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
  },
});

export const { addOneProduct, addProduct, updateProduct, delProduct } =
  CarSlice.actions;

export const CarReducer = CarSlice.reducer;
