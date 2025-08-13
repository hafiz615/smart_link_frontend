"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/useAuth";
import { useSites } from "../../../hooks/useSites";
import { deleteSite } from "@/redux/sites/sitesThunk";
import { useDebounce } from "../../../hooks/useDebounce";

import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import DashboardHeader from "../../../components/Admin/DashboardHeader";
import Filters from "../../../components/Admin/Filters";
import SitesTable from "../../../components/Admin/SitesTable";
import SiteModal from "../../../components/Admin/SiteModal";
import { Container, EmptyState } from "../../../components/Admin/styles";
import { toast } from "react-toastify";

const categories = [
  "Technology",
  "Design",
  "News",
  "Education",
  "Entertainment",
  "Business",
  "Health",
  "Sports",
];

const AdminPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const { filteredSites, isLoading, handleSearch, handleCategoryFilter } =
    useSites();

  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSite, setEditingSite] = useState(null);

  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, isAdmin, router]);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  const handleAddSite = () => {
    setEditingSite(null);
    setShowModal(true);
  };

  const handleEditSite = (site) => {
    setEditingSite(site);
    setShowModal(true);
  };

  const handleDeleteSite = async (id) => {
    if (window.confirm("Are you sure you want to delete this site?")) {
      dispatch(deleteSite(id));
      toast.success("Site Deleted Successfully.");
    }
  };

  if (authLoading) return <LoadingSpinner />;
  if (!isAuthenticated || !isAdmin) return null;

  return (
    <Container>
      <DashboardHeader onAddSite={handleAddSite} />
      <Filters
        searchTerm={localSearchTerm}
        onSearchChange={setLocalSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        onFilter={handleCategoryFilter}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : filteredSites.length === 0 ? (
        <EmptyState>
          <h3>No sites found</h3>
          <p>Add your first site or adjust your search filters</p>
        </EmptyState>
      ) : (
        <SitesTable
          sites={filteredSites}
          onEdit={handleEditSite}
          onDelete={handleDeleteSite}
        />
      )}

      {showModal && (
        <SiteModal
          site={editingSite}
          onClose={() => {
            setShowModal(false);
            setEditingSite(null);
          }}
        />
      )}
    </Container>
  );
};

export default AdminPage;
