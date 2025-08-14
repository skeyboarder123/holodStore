import { BASE_URL, API_ROUTES } from './routes.js';

// Fallback данные на случай проблем с API
const fallbackCatalogs = {
  results: [
    {
      id: 1,
      name: 'Кондиционеры',
      slug: 'kondicionery',
      image: 'imgs/slider_items/cola.webp',
      description: 'Бытовые и промышленные кондиционеры всех типов',
    },
    {
      id: 2,
      name: 'Вентиляция',
      slug: 'ventilyaciya',
      image: 'imgs/slider_items/herbalife.webp',
      description: 'Системы приточно-вытяжной вентиляции',
    },
    {
      id: 3,
      name: 'Тепловые завесы',
      slug: 'teplovye-zavesy',
      image: 'imgs/slider_items/ferrero.webp',
      description: 'Воздушные и тепловые завесы для зданий',
    },
    {
      id: 4,
      name: 'Сервис и монтаж',
      slug: 'servis-montazh',
      image: 'imgs/slider_items/uber.webp',
      description: 'Профессиональный монтаж и обслуживание',
    },
  ],
  meta: {
    title: 'Точка Холода - климатическая техника',
    description:
      'Интернет-магазин климатической техники и вентиляционного оборудования от официального дилера в Москве',
    keywords: 'кондиционеры, вентиляция, климат, монтаж, сервис',
  },
};

export const catalogsApi = {
  async getCatalogs() {
    try {
      // Если BASE_URL null (GitHub Pages), сразу используем fallback
      if (!BASE_URL) {
        console.warn(
          'API недоступен (CORS/GitHub Pages), используем fallback данные'
        );
        return fallbackCatalogs;
      }

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
