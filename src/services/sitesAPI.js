import api from "./api";

const sitesAPI = {
  getSites: (search = "", category = "") =>
    api.get(`/api/v1/sites?search=${search}&category=${category}`),
  getSite: (id) => api.get(`/api/v1/sites/${id}`),
  createSite: (siteData) => api.post("/api/v1/sites", siteData),
  updateSite: (id, siteData) => api.put(`/api/v1/sites/${id}`, siteData),
  deleteSite: (id) => api.delete(`/api/v1/sites/${id}`),
};

export default sitesAPI;
