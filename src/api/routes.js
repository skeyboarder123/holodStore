export const API_ROUTES = {
  CATALOGS: 'catalogs/',
  SUBCATALOGS: 'subcatalogs/',
  ARTICLES: 'articles/',
  PRODUCTS: 'products/',
  DOCUMENTS: 'documents/',
  RECOMMENDED_STOCK: 'recommended/',
  PENDING_ORDERS: 'pending-orders/',
  CALLBACK_REQUESTS: 'callback-requests/',
};

// Определяем BASE_URL в зависимости от окружения
function getApiBaseUrl() {
  // Если есть переменная окружения для API URL
  if (window.API_BASE_URL) {
    return window.API_BASE_URL;
  }

  // Принудительное использование HTTP (для отладки SSL проблем)
  if (window.FORCE_HTTP_API) {
    return 'http://37.114.37.7:8000/api/';
  }

  // Для разработки на localhost - принудительно используем HTTP
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    return 'http://37.114.37.7:8000/api/';
  }

  // Для GitHub Pages - CORS проблемы с внешним API
  // Используем локальные данные или mock API
  if (
    window.location.hostname.includes('github.io') ||
    window.location.hostname.includes('pages')
  ) {
    // Возвращаем null чтобы использовать только fallback данные
    // так как внешний API не настроен для CORS с GitHub Pages
    console.warn(
      'GitHub Pages обнаружены (https://skeyboarder123.github.io/holodStore/), используем только локальные данные'
    );
    return null;
  }

  // По умолчанию - API на том же хосте
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}/api/`;
}

export const BASE_URL = getApiBaseUrl();
