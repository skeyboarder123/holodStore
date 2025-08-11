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

// Определяем BASE_URL в зависимости от протокола страницы
export const BASE_URL = window.location.protocol === 'https:' 
  ? 'https://37.114.37.7:8000/api/' 
  : 'http://37.114.37.7:8000/api/';
