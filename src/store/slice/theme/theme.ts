import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  isActive: boolean;
}

const initialState: ThemeState = { isActive: false };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isActive = !state.isActive;
    },
    resetTheme: (state) => {
      state.isActive = false;
    },
  },
});

export const { toggleTheme, resetTheme } = themeSlice.actions;

export const themeReducer = themeSlice.reducer;
