import { createAsyncThunk } from "@reduxjs/toolkit";
import sitesAPI from "../../services/sitesAPI";
import aiAPI from "../../services/aiAPI";

export const fetchSites = createAsyncThunk(
  "sites/fetchSites",
  async ({ search = "", category = "" }, { rejectWithValue }) => {
    try {
      const response = await sitesAPI.getSites(search, category);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch sites"
      );
    }
  }
);

export const createSite = createAsyncThunk(
  "sites/createSite",
  async (siteData, { rejectWithValue }) => {
    try {
      const response = await sitesAPI.createSite(siteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create site"
      );
    }
  }
);

export const updateSite = createAsyncThunk(
  "sites/updateSite",
  async ({ id, siteData }, { rejectWithValue }) => {
    try {
      const response = await sitesAPI.updateSite(id, siteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update site"
      );
    }
  }
);

export const deleteSite = createAsyncThunk(
  "sites/deleteSite",
  async (id, { rejectWithValue }) => {
    try {
      await sitesAPI.deleteSite(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete site"
      );
    }
  }
);

export const generateDescription = createAsyncThunk(
  "sites/generateDescription",
  async ({ title, category }, { rejectWithValue }) => {
    try {
      const response = await aiAPI.generateDescription(title, category);
      return response.data.description;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to generate description"
      );
    }
  }
);
