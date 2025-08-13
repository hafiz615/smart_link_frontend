import { createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../../services/auhtAPI";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.login(email, password);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.log("error:   errrr", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "Login failed"
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ username, email, password, role }, { rejectWithValue }) => {
    try {
      const { data } = await authAPI.signup(username, email, password, role);
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Signup failed";

      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  return null;
});
