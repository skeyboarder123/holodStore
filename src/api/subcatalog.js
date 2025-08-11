import { BASE_URL, API_ROUTES } from './routes.js';

export const subcatalogsApi = {
  async getSubcatalogBySlug(catalogSlug, subcatalogSlug) {
    try {
      try {
        const response = await fetch(
          `${BASE_URL}${API_ROUTES.CATALOGS}${catalogSlug}/${subcatalogSlug}`
        );
        if (response.ok) {
          return await response.json();
        }
      } catch (apiError) {}
    } catch (error) {
      throw error;
    }
  },
};
