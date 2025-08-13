import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  sidebarOpen: false,
  modalOpen: false,
  modalType: null,
  editingSite: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalType = action.payload.type;
      state.editingSite = action.payload.site || null;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalType = null;
      state.editingSite = null;
    },
  },
});

export const { toggleTheme, toggleSidebar, openModal, closeModal } =
  uiSlice.actions;
export default uiSlice.reducer;
