import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import sitesSlice from "./sites/sitesSlice";
import uiSlice from "./ui/uiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    sites: sitesSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export default store;
