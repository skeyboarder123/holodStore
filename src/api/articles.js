import { BASE_URL, API_ROUTES } from './routes.js';

export const articlesApi = {
  getArticles: async () => {
    const response = await fetch(`${BASE_URL}${API_ROUTES.ARTICLES}`);
    return response.json();
  },
  getArticleBySlug: async (slug) => {
    const response = await fetch(`${BASE_URL}${API_ROUTES.ARTICLES}${slug}`);
    return response.json();
  },
};
