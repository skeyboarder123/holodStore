import { BASE_URL, API_ROUTES } from './routes.js';

// Fallback данные на случай проблем с API
const fallbackCatalogs = {
  results: [],
  meta: {
    title: 'Точка Холода - климатическая техника',
    description:
      'Интернет-магазин климатической техники и вентиляционного оборудования',
    keywords: 'кондиционеры, вентиляция, климат',
  },
};

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
      console.warn('Используем fallback данные');
      return fallbackCatalogs;
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
