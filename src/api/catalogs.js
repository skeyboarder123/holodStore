import { BASE_URL, API_ROUTES } from './routes.js';

export const catalogsApi = {
  async getCatalogs() {
    try {
      const response = await fetch(`${BASE_URL}${API_ROUTES.CATALOGS}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении каталогов');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при запросе каталогов:', error);
      throw error;
    }
  },

  async getCatalogBySlug(slug) {
    try {
      try {
        const response = await fetch(`${BASE_URL}catalogs/${slug}`);
        if (response.ok) {
          return await response.json();
        }
      } catch (apiError) {
        console.warn(
          'API запрос не сработал, используем локальные данные:',
          apiError
        );
      }
    } catch (error) {
      console.error('Ошибка при запросе каталога:', error);
      throw error;
    }
  },
};
