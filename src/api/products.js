import { BASE_URL, API_ROUTES } from './routes.js';

// Fallback данные для рекомендуемых товаров
const fallbackRecommendedStock = [
  {
    id: 1,
    name: 'Кондиционер Daikin FTXB35C',
    slug: 'daikin-ftxb35c',
    image: 'imgs/slider_items/kabi.webp',
    price: 45000,
    old_price: 52000,
    description: 'Энергоэффективная сплит-система с инверторным управлением',
    brand: 'Daikin',
    inStock: true,
  },
  {
    id: 2,
    name: 'Приточная установка Systemair SAVE VTR 300',
    slug: 'systemair-save-vtr-300',
    image: 'imgs/slider_items/herbalife.webp',
    price: 89000,
    old_price: 95000,
    description: 'Компактная приточно-вытяжная установка с рекуперацией',
    brand: 'Systemair',
    inStock: true,
  },
  {
    id: 3,
    name: 'Тепловая завеса Ballu BHC-L10-S06',
    slug: 'ballu-bhc-l10-s06',
    image: 'imgs/slider_items/ferrero.webp',
    price: 15500,
    old_price: 18000,
    description: 'Электрическая тепловая завеса с керамическим нагревателем',
    brand: 'Ballu',
    inStock: true,
  },
];

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
      // Если BASE_URL null (GitHub Pages), сразу используем fallback
      if (!BASE_URL) {
        console.warn(
          'API недоступен (CORS/GitHub Pages), используем fallback данные для рекомендуемых товаров'
        );
        return fallbackRecommendedStock;
      }

      const response = await fetch(
        `${BASE_URL}${API_ROUTES.RECOMMENDED_STOCK}`
      );
      if (!response.ok) {
        throw new Error('Ошибка при получении рекомендуемых товаров');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при запросе рекомендуемых товаров:', error);
      console.warn('Используем fallback данные для рекомендуемых товаров');
      return fallbackRecommendedStock;
    }
  },
};
