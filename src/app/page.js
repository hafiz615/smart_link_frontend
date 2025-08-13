"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSites } from "../hooks/useSites";
import SiteCard from "../components/Site/SiteCard/SiteCard";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { Input, Select } from "../components/UI/Input";
import { useDebounce } from "../hooks/useDebounce";

const Container = styled.div`
  margin-top: 60px;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled(Input)`
  max-width: 300px;
`;

const CategorySelect = styled(Select)`
  max-width: 200px;
`;

const SitesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

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

const Home = () => {
  const {
    filteredSites,
    isLoading,
    handleSearch,
    handleCategoryFilter,
    selectedCategory,
  } = useSites();
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    handleCategoryFilter(e.target.value);
  };

  if (isLoading && filteredSites.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <Header>
        <Title>Smart Links Directory</Title>
        <Subtitle>Discover amazing websites curated for you</Subtitle>
      </Header>

      <FiltersContainer>
        <SearchInput
          type="text"
          placeholder="Search sites..."
          value={localSearchTerm}
          onChange={handleSearchChange}
        />
        <CategorySelect
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </CategorySelect>
      </FiltersContainer>

      {Array.isArray(filteredSites) && filteredSites.length > 0 ? (
        <SitesGrid>
          {filteredSites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </SitesGrid>
      ) : (
        <EmptyState>
          <h3>No sites found</h3>
          <p>Try adjusting your search or filters</p>
        </EmptyState>
      )}
    </Container>
  );
};

export default Home;
