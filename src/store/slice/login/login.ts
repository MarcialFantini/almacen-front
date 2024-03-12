import { createSlice } from "@reduxjs/toolkit";
import { createUserActionThunk, loginUserToken } from "./actions";

interface LoginInterface {
  token: string | null;
  isAdmin: boolean;
  isLogin: boolean;
}

// let token = "";

// if (typeof localStorage !== "undefined") {
//   try {
//     token = localStorage.getItem("token") || "";
//   } catch (error) {
//     console.log(error);
//   }
// } else {
//   console.log("localStorage is not available in this environment.");
// }

let token: null | string = null;

if (typeof document !== "undefined" && document.cookie !== "null") {
  const cookieArray = document.cookie.split(";");

  cookieArray.forEach((element) => {
    const cookie = element.trim();
    if (cookie.startsWith("jwtToken=")) {
      console.log(cookie.substring("jwtToken=".length));
      token = cookie.substring("jwtToken=".length);
    }
  });
}

const delCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const initialState: LoginInterface = {
  token,
  isAdmin: false,
  isLogin: token !== null,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    removeLogin: (state) => {
      console.log(state.token);
      delCookie("jwtToken");
      return (state = { token: null, isAdmin: false, isLogin: false });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUserActionThunk.fulfilled, (state, action) => {
      state.token = action.payload.data.token;
      state.isAdmin = action.payload.data.isAdmin;
      state.isLogin = true;

      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 72 * 60 * 60 * 1000);
      const expirationDateString = expirationDate.toUTCString();
      const cookieString =
        "jwtToken=" +
        action.payload.data.token +
        "; expires=" +
        expirationDateString +
        "; path=/";

      document.cookie = cookieString;
    });
    builder.addCase(createUserActionThunk.rejected, (state) => {
      state = initialState;
      document.cookie = "";
    });

    builder.addCase(loginUserToken.fulfilled, (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      state.isLogin = true;
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 72 * 60 * 60 * 1000);
      const expirationDateString = expirationDate.toUTCString();
      const cookieString =
        "jwtToken=" +
        action.payload.token +
        "; expires=" +
        expirationDateString +
        "; path=/";
      document.cookie = cookieString;
    });

    builder.addCase(loginUserToken.rejected, (state, action) => {
      // state = initialState;
      // delCookie("jwtToken");
    });
  },
});

export const { removeLogin } = loginSlice.actions;

export const LoginReducer = loginSlice.reducer;
