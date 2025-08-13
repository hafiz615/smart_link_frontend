const applyFilters = (sites, searchTerm, selectedCategory) => {
  let filtered = Array.isArray(sites) ? [...sites] : [];

  if (searchTerm && searchTerm.trim()) {
    const searchLower = searchTerm.toLowerCase().trim();
    filtered = filtered.filter((site) => {
      const titleMatch =
        site.title && site.title.toLowerCase().includes(searchLower);
      const urlMatch =
        (site.siteUrl && site.siteUrl.toLowerCase().includes(searchLower)) ||
        (site.siteurl && site.siteurl.toLowerCase().includes(searchLower));
      return titleMatch || urlMatch;
    });
  }

  if (selectedCategory && selectedCategory.trim()) {
    filtered = filtered.filter((site) => site.category === selectedCategory);
  }

  return filtered;
};

export default applyFilters;
