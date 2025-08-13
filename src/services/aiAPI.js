import api from "./api";

const aiAPI = {
  generateDescription: (title, category) =>
    api.post("/api/v1/ai/generate-description", { title, category }),
};

export default aiAPI;
