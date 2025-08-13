import { FiltersContainer } from "./styles";
import { Input, Select } from "../UI/Input";

const Filters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  onFilter,
}) => {
  const handleCategorySelect = (e) => {
    const category = e.target.value;
    onCategoryChange(category);
    onFilter(category);
  };

  return (
    <FiltersContainer>
      <Input
        type="text"
        placeholder="Search sites..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ maxWidth: "300px" }}
      />
      <Select
        value={selectedCategory}
        onChange={handleCategorySelect}
        style={{ maxWidth: "200px" }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
    </FiltersContainer>
  );
};

export default Filters;
