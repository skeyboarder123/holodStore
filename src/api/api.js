import { catalogsApi } from './catalogs.js';
import { productsApi } from './products.js';
import { documentsApi } from './documents.js';
import { articlesApi } from './articles.js';
import { subcatalogsApi } from './subcatalog.js';
import { callbackApi } from './callbacks.js';

const api = {
  getCatalogs: catalogsApi.getCatalogs,
  getCatalogBySlug: catalogsApi.getCatalogBySlug,
  getSubcatalogBySlug: subcatalogsApi.getSubcatalogBySlug,
  getArticles: articlesApi.getArticles,
  getProductBySlug: productsApi.getProductBySlug,
  getRecommendedStock: productsApi.getRecommendedStock,
  getArticleBySlug: articlesApi.getArticleBySlug,

  getDocuments: documentsApi.getDocuments,
  sendCallbackRequest: callbackApi.sendCallbackRequest,
};

export default api;
