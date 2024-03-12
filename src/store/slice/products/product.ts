import { createSlice } from "@reduxjs/toolkit";
import {
  DeleteProduct,
  ProductUpdate,
  createProductAdmin,
  setProductsAdmin,
  setProductsGallery,
  setProductsGallerySearch,
  setProductsHome,
} from "./actions";
import { Colors } from "@/utils/enums";

export interface ResponseManyProducts {
  data: Product[];
  message: string;
  code: number;
}

export interface Product {
  id: string;
  name: string;
  amount: number;
  price: number;
  ProductImages: ProductImage[];
}

export interface ProductImage {
  id?: string;
}

export interface ProductsSlice {
  homeProducts: Product[];
  adminProducts: Product[];
  galleryProducts: Product[];
  eventResponse: Colors;
}

const initialState: ProductsSlice = {
  homeProducts: [],
  adminProducts: [],
  galleryProducts: [],
  eventResponse: Colors.DefaultColor,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetFlags: (state) => {
      state.eventResponse = Colors.DefaultColor;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setProductsHome.fulfilled, (state, actions) => {
      state.homeProducts = actions.payload;
    });
    builder.addCase(setProductsAdmin.fulfilled, (state, action) => {
      state.adminProducts = action.payload;
    });
    builder.addCase(createProductAdmin.fulfilled, (state, action) => {
      state.eventResponse = Colors.CreatedColor;
    });
    builder.addCase(createProductAdmin.rejected, (state, action) => {
      state.eventResponse = Colors.ErrorColor;
      console.log(action.payload);
      console.log(action.error);
    });
    builder.addCase(createProductAdmin.pending, (state, action) => {
      state.eventResponse = Colors.PendingColor;
    });

    builder.addCase(ProductUpdate.fulfilled, (state, action) => {
      state.eventResponse = Colors.CreatedColor;
    });
    builder.addCase(ProductUpdate.pending, (state, action) => {
      state.eventResponse = Colors.PendingColor;
    });
    builder.addCase(ProductUpdate.rejected, (state, action) => {
      state.eventResponse = Colors.ErrorColor;
    });

    builder.addCase(DeleteProduct.fulfilled, (state, action) => {
      state.adminProducts = state.adminProducts.filter(
        (product) => product.id !== action.meta.arg.id
      );
    });

    builder.addCase(setProductsGallery.fulfilled, (state, action) => {
      state.galleryProducts = [...action.payload];
    });

    builder.addCase(setProductsGallerySearch.fulfilled, (state, action) => {
      state.galleryProducts = action.payload;
    });
  },
});

export const { resetFlags } = productSlice.actions;

export const productReducer = productSlice.reducer;
