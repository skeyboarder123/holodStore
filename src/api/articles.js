import { BASE_URL, API_ROUTES } from './routes.js';

// Fallback данные на случай проблем с API
const fallbackArticles = {
  results: [
    {
      id: 1,
      title: 'Монтаж кондиционеров',
      slug: 'montazh-kondicionerov',
      content:
        'Профессиональный монтаж сплит-систем и промышленных кондиционеров с гарантией качества.',
      excerpt: 'Установка климатического оборудования под ключ',
      image: 'imgs/slider_items/kabi.webp',
      meta: {
        title: 'Монтаж кондиционеров в Москве - Точка Холода',
        description:
          'Профессиональный монтаж кондиционеров любой сложности с гарантией',
        keywords: 'монтаж кондиционеров, установка сплит-систем',
      },
    },
    {
      id: 2,
      title: 'Сервис и ремонт',
      slug: 'servis-remont',
      content:
        'Авторизованный сервисный центр по ремонту климатической техники всех брендов.',
      excerpt: 'Качественный ремонт с оригинальными запчастями',
      image: 'imgs/slider_items/btk.webp',
      meta: {
        title: 'Сервис и ремонт кондиционеров - Точка Холода',
        description:
          'Авторизованный сервисный центр по ремонту климатической техники',
        keywords: 'ремонт кондиционеров, сервис климатической техники',
      },
    },
    {
      id: 3,
      title: 'Проектирование вентиляции',
      slug: 'proektirovanie-ventilyacii',
      content:
        'Проектирование систем вентиляции и кондиционирования для коммерческих объектов.',
      excerpt: 'Индивидуальные решения для каждого объекта',
      image: 'imgs/slider_items/cola.webp',
      meta: {
        title: 'Проектирование вентиляции - Точка Холода',
        description:
          'Профессиональное проектирование систем вентиляции и кондиционирования',
        keywords: 'проектирование вентиляции, системы кондиционирования',
      },
    },
  ],
  meta: {
    title: 'Услуги и сервис - Точка Холода',
    description:
      'Монтаж, сервис, ремонт климатической техники. Проектирование систем вентиляции в Москве',
    keywords: 'монтаж кондиционеров, ремонт, сервис, проектирование вентиляции',
  },
};

export const articlesApi = {
  getArticles: async () => {
    try {
      // Если BASE_URL null (GitHub Pages), сразу используем fallback
      if (!BASE_URL) {
        console.warn(
          'API недоступен (CORS/GitHub Pages), используем fallback данные для статей'
        );
        return fallbackArticles;
      }

      const response = await fetch(`${BASE_URL}${API_ROUTES.ARTICLES}`);

      if (!response.ok) {
        throw new Error('Ошибка при получении статей');
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при запросе статей:', error);
      console.warn('Используем fallback данные для статей');
      return fallbackArticles;
    }
  },
  getArticleBySlug: async (slug) => {
    try {
      const response = await fetch(`${BASE_URL}${API_ROUTES.ARTICLES}${slug}`);

      if (!response.ok) {
        throw new Error(`Ошибка при получении статьи: ${slug}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Ошибка при запросе статьи:', error);
      throw error; // Для отдельных статей выбрасываем ошибку
    }
  },
};
