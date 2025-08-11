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

  // Для разработки на localhost
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    return 'http://37.114.37.7:8000/api/';
  }

  // Для production - используем тот же протокол и хост, что и сайт
  const protocol = window.location.protocol;
  const host = window.location.host;

  // Если API на том же домене
  if (
    window.location.hostname.includes('github.io') ||
    window.location.hostname.includes('pages')
  ) {
    // Для GitHub Pages используем внешний API
    return protocol === 'https:'
      ? 'https://37.114.37.7:8000/api/'
      : 'http://37.114.37.7:8000/api/';
  }

  // По умолчанию - API на том же хосте
  return `${protocol}//${host}/api/`;
}

export const BASE_URL = getApiBaseUrl();
