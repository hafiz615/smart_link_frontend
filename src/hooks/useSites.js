import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import {
  setSearchTerm,
  setSelectedCategory,
  filterSites,
} from "../redux/sites/sitesSlice";
import { fetchSites } from "@/redux/sites/sitesThunk";
export const useSites = () => {
  const dispatch = useDispatch();
  const {
    sites,
    filteredSites,
    isLoading,
    error,
    searchTerm,
    selectedCategory,
    generatingDescription,
  } = useSelector((state) => state.sites);

  useEffect(() => {
    dispatch(fetchSites({ search: "", category: "" }));
  }, []);
  useEffect(() => {
    filterSites;
  }, [searchTerm, selectedCategory, dispatch]);

  const handleSearch = useCallback(
    (term) => {
      dispatch(setSearchTerm(term));
    },
    [dispatch]
  );

  const handleCategoryFilter = useCallback(
    (category) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );

  const refreshSites = useCallback(() => {
    dispatch(fetchSites({ search: searchTerm, category: selectedCategory }));
  }, [dispatch, searchTerm, selectedCategory]);

  return {
    sites,
    filteredSites,
    isLoading,
    error,
    searchTerm,
    selectedCategory,
    generatingDescription,
    handleSearch,
    handleCategoryFilter,
    refreshSites,
  };
};
