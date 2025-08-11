import { BASE_URL, API_ROUTES } from './routes.js';

export const productsApi = {
  async getProductBySlug(catalogSlug, subcatalogSlug, productSlug) {
    try {
      try {
        const response = await fetch(
          `${BASE_URL}${API_ROUTES.CATALOGS}${catalogSlug}/${subcatalogSlug}/${productSlug}`
        );
        if (response.ok) {
          return await response.json();
        }
      } catch (apiError) {}

      if (foundProduct) {
        return foundProduct;
      } else {
        throw new Error(
          `Продукт со slug ${productSlug} не найден в каталоге ${catalogSlug} и субкаталоге ${subcatalogSlug}`
        );
      }
    } catch (error) {
      console.error('Ошибка при запросе продукта:', error);
      throw error;
    }
  },

  async getRecommendedStock() {
    try {
      const response = await fetch(
        `${BASE_URL}${API_ROUTES.RECOMMENDED_STOCK}`
      );
      if (!response.ok) {
        throw new Error('Ошибка при получении рекомендуемых товаров');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при запросе рекомендуемых товаров:', error);
      throw error;
    }
  },
};
