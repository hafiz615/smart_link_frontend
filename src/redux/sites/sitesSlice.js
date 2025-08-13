import { createSlice } from "@reduxjs/toolkit";
import applyFilters from "../helpers/sitesHelper";
import {
  fetchSites,
  createSite,
  updateSite,
  deleteSite,
  generateDescription,
} from "./sitesThunk";

const initialState = {
  sites: [],
  filteredSites: [],
  isLoading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "",
  generatingDescription: false,
};

const sitesSlice = createSlice({
  name: "sites",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredSites = applyFilters(
        state.sites,
        action.payload,
        state.selectedCategory
      );
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredSites = applyFilters(
        state.sites,
        state.searchTerm,
        action.payload
      );
    },
    filterSites: (state) => {
      state.filteredSites = applyFilters(
        state.sites,
        state.searchTerm,
        state.selectedCategory
      );
    },
    resetFilters: (state) => {
      state.searchTerm = "";
      state.selectedCategory = "";
      state.filteredSites = [...state.sites];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchSites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSites.fulfilled, (state, action) => {
        state.isLoading = false;
        let sitesData = action.payload;

        if (typeof sitesData === "object" && !Array.isArray(sitesData)) {
          sitesData =
            sitesData.sites || sitesData.data || sitesData.results || [];
        }

        state.sites = Array.isArray(sitesData) ? sitesData : [];
        state.filteredSites = applyFilters(
          state.sites,
          state.searchTerm,
          state.selectedCategory
        );
      })
      .addCase(fetchSites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.sites = [];
        state.filteredSites = [];
      })

      .addCase(createSite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sites.unshift(action.payload);
        state.filteredSites = applyFilters(
          state.sites,
          state.searchTerm,
          state.selectedCategory
        );
      })
      .addCase(createSite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Site
      .addCase(updateSite.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.sites.findIndex(
          (site) => site.id === action.payload.id
        );
        if (index !== -1) {
          state.sites[index] = action.payload;
        }
        state.filteredSites = applyFilters(
          state.sites,
          state.searchTerm,
          state.selectedCategory
        );
      })
      .addCase(updateSite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteSite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sites = state.sites.filter((site) => site.id !== action.payload);
        state.filteredSites = state.filteredSites.filter(
          (site) => site.id !== action.payload
        );
      })
      .addCase(deleteSite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(generateDescription.pending, (state) => {
        state.generatingDescription = true;
      })
      .addCase(generateDescription.fulfilled, (state) => {
        state.generatingDescription = false;
      })
      .addCase(generateDescription.rejected, (state, action) => {
        state.generatingDescription = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  setSearchTerm,
  setSelectedCategory,
  filterSites,
  resetFilters,
} = sitesSlice.actions;

export default sitesSlice.reducer;
