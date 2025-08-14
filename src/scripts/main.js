import './UI/header.js';
import './UI/dropdown.js';
import './UI/mobile-menu.js';
import { initializeForm } from './UI/form.js';
import { loadHome } from './Pages/home.js';
import { loadCatalog } from './Pages/catalog/catalog.js';
import { loadCategory } from './Pages/cond/category.js';
import { loadProduct } from './Pages/product.js';
import { loadCompany } from './Pages/company/company.js';
import { loadRecvisits } from './Pages/company/company-routes/recvisits.js';
import { loadClients } from './Pages/company/company-routes/clients.js';
import { loadContacts } from './Pages/company/company-routes/contacts.js';
import { loadFeed } from './Pages/company/company-routes/feedback.js';
import { loadServices } from './Pages/services/services.js';
import { loadSubcategory } from './Pages/catalog/subcategory.js';
import { loadServicesSlug } from './Pages/services/slugPages/servicesSlug.js';
import { loadBuck } from './Pages/bucket.js';
import { loadPay } from './Pages/payment.js';
import { loadNotFound } from './Pages/notFound.js';
import api from '../api/api.js';
import { getCurrentRelativePath, isCurrentPath } from './utils/pathUtils.js';

// Performance optimizations
const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour cache

// Cache API responses to reduce network requests
const apiCache = {
  get: (key) => {
    const cached = localStorage.getItem(`api_cache_${key}`);
    if (!cached) return null;

    try {
      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY;

      return isExpired ? null : data;
    } catch (e) {
      console.error('Cache error:', e);
      return null;
    }
  },

  set: (key, data) => {
    try {
      localStorage.setItem(
        `api_cache_${key}`,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (e) {
      console.error('Cache save error:', e);
    }
  },
};

// Defer non-critical operations
const deferOperation = (fn) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => fn());
  } else {
    setTimeout(fn, 1);
  }
};

function optimizePageImages() {
  document.querySelectorAll('img:not([loading])').forEach((img) => {
    if (img.classList.contains('logo')) return;

    img.loading = 'lazy';

    if (!img.hasAttribute('decoding')) {
      img.decoding = 'async';
    }

    if (img.width && img.height && !img.style.aspectRatio) {
      img.style.aspectRatio = `${img.width} / ${img.height}`;
    }
  });
}

async function router() {
  let path = window.location.pathname;

  // При использовании <base href> извлекаем относительный путь
  if (window.location.hostname.includes('github.io')) {
    // Убираем /holodStore из пути для внутренней логики роутинга
    if (path.startsWith('/holodStore/')) {
      path = path.substring('/holodStore'.length);
    } else if (path === '/holodStore') {
      path = '/';
    }
  }

  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  if (!path || path === '') path = '/';

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  const mainContent = document.getElementById('main_content');
  if (mainContent) {
    mainContent.style.minHeight = '50vh';
  }

  if (path.match(/^\/services\/[a-zA-Z0-9-]+$/)) {
    const slug = path.split('/').pop();

    const cachedContent = apiCache.get(`services_${slug}`);
    if (cachedContent) {
      loadServicesSlug(cachedContent);
      deferOperation(async () => {
        const freshContent = await api.getArticleBySlug(slug);
        apiCache.set(`services_${slug}`, freshContent);
      });
      return;
    }

    const content = await api.getArticleBySlug(slug);
    apiCache.set(`services_${slug}`, content);
    loadServicesSlug(content);
    return;
  }

  if (path.match(/^\/catalog\/[a-zA-Z0-9-]+$/)) {
    const slug = path.split('/').pop();
    if (!['category', 'klim', 'kart'].includes(slug)) {
      handleCatalogBySlug(slug);
      return;
    }
  }

  if (path.match(/^\/catalog\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/)) {
    const parts = path.split('/');
    const catalogSlug = parts[2];
    const subcatalogSlug = parts[3];
    console.log('Обнаружен путь к субкаталогу:', catalogSlug, subcatalogSlug);
    handleSubcatalogBySlug(catalogSlug, subcatalogSlug);
    return;
  }

  // Проверка на пути вида /catalog/[catalogSlug]/[subcatalogSlug]/[productSlug]
  if (path.match(/^\/catalog\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/)) {
    const parts = path.split('/');
    const catalogSlug = parts[2];
    const subcatalogSlug = parts[3];
    const productSlug = parts[4];

    handleProductBySlug(catalogSlug, subcatalogSlug, productSlug);
    return;
  }

  switch (path) {
    case '/':
      loadHome();
      break;

    case '/bucket':
      loadBuck();
      break;

    case '/catalog':
      loadCatalog();
      break;

    case '/payment':
      loadPay();
      break;

    case '/catalog/category':
      loadCategory({});
      break;

    case '/catalog/category/subcategory':
      loadSubcategory({});
      break;

    case '/catalog/category/kart':
      loadProduct({});
      break;

    case '/services':
      loadServices();
      break;

    case '/company':
      loadCompany();
      break;

    case '/company/recvisits':
      loadRecvisits();
      break;

    case '/company/clients':
      loadClients();
      break;

    case '/company/contacts':
      loadContacts();
      break;

    case '/company/feedback':
      loadFeed();
      break;

    default:
      // Показываем страницу 404 для неизвестных маршрутов
      console.warn('Неизвестный маршрут:', path);
      console.log(
        'Доступные маршруты: /, /catalog, /services, /company, /bucket, /payment'
      );
      loadNotFound();
  }

  // Run optimizations after page loads
  deferOperation(optimizePageImages);
}

// Optimized api handlers with caching
async function handleCatalogBySlug(slug) {
  console.log('handleCatalogBySlug вызван для slug:', slug);

  // Try from cache first
  const cachedCatalog = apiCache.get(`catalog_${slug}`);
  if (cachedCatalog) {
    loadCategory({
      slug,
      metaData: cachedCatalog.meta || {
        title: cachedCatalog.title || `Категория ${cachedCatalog.name || slug}`,
        description: cachedCatalog.description || '',
        keywords: cachedCatalog.keywords || '',
      },
    });

    // Refresh in background
    deferOperation(async () => {
      try {
        const freshCatalog = await api.getCatalogBySlug(slug);
        apiCache.set(`catalog_${slug}`, freshCatalog);
      } catch (error) {
        console.error('Фоновое обновление каталога не удалось:', error);
      }
    });

    return;
  }

  try {
    const catalog = await api.getCatalogBySlug(slug);
    console.log('Получены данные каталога:', catalog);

    // Cache result
    apiCache.set(`catalog_${slug}`, catalog);

    if (catalog) {
      loadCategory({
        slug,
        metaData: catalog.meta || {
          title: catalog.title || `Категория ${catalog.name || slug}`,
          description: catalog.description || '',
          keywords: catalog.keywords || '',
        },
      });
    } else {
      console.error('Каталог не найден или не содержит ID');
      loadNotFound();
    }
  } catch (error) {
    console.error('Ошибка при получении каталога по slug:', error);
    loadNotFound();
  }
}

// Функция для обработки субкаталога по slug
async function handleSubcatalogBySlug(catalogSlug, slug) {
  console.log('handleSubcatalogBySlug вызван для slug:', slug);
  try {
    const subcatalog = await api.getSubcatalogBySlug(catalogSlug, slug);
    console.log('Получены данные субкаталога:', subcatalog);

    if (subcatalog) {
      // Передаем ID субкаталога, slug и метаданные (если они есть)
      console.log(subcatalog);
      loadSubcategory({
        slug,
        catalogSlug,
        metaData: subcatalog.meta || {
          title: subcatalog.title || `Субкаталог ${subcatalog.name || slug}`,
          description: subcatalog.description || '',
          keywords: subcatalog.keywords || '',
        },
      });
    } else {
      console.error('Субкаталог не найден или не содержит ID');
      loadNotFound();
    }
  } catch (error) {
    console.error('Ошибка при получении субкаталога по slug:', error);
    loadNotFound();
  }
}

// Функция для обработки продукта по slug
async function handleProductBySlug(catalogSlug, subcatalogSlug, productSlug) {
  try {
    const product = await api.getProductBySlug(
      catalogSlug,
      subcatalogSlug,
      productSlug
    );
    console.log('Получены данные продукта:', product);

    if (product) {
      // Передаем ID продукта, slug и метаданные (если они есть)
      loadProduct({
        product,
        metaData: product.meta || {
          title: product.title || `Продукт ${product.name || productSlug}`,
          description: product.description || '',
          keywords: product.keywords || '',
        },
      });
    } else {
      console.error('Продукт не найден или не содержит ID');
      loadNotFound();
    }
  } catch (error) {
    console.error('Ошибка при получении продукта по slug:', error);
    loadNotFound();
  }
}

function handleNavigation(path) {
  event.preventDefault();

  // Когда используется <base href>, браузер автоматически добавляет базовый путь
  // Поэтому просто используем относительный путь
  console.log('Navigation to path:', path);

  history.pushState({}, '', path);
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  router();
}

document.addEventListener('DOMContentLoaded', () => {
  // Когда используется <base href>, браузер автоматически обрабатывает базовый путь

  // Инициализация формы обратного звонка
  initializeForm();

  // Add event listeners using event delegation to reduce handlers
  document.body.addEventListener('click', (event) => {
    // Find closest anchor element in case the click was on child element
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Handle internal links with delegation instead of multiple listeners
    if (href === '/') {
      event.preventDefault();
      handleNavigation('/');
    } else if (href === '/bucket') {
      event.preventDefault();
      handleNavigation('/bucket');
    } else if (href === '/catalog') {
      event.preventDefault();
      handleNavigation('/catalog');
    } else if (href === '/company') {
      event.preventDefault();
      handleNavigation('/company');
    } else if (href === '/services') {
      event.preventDefault();
      handleNavigation('/services');
    } else if (href === '/company/recvisits') {
      event.preventDefault();
      handleNavigation('/company/recvisits');
    } else if (href === '/payment') {
      event.preventDefault();
      handleNavigation('/payment');
    } else if (href === '/company/clients') {
      event.preventDefault();
      handleNavigation('/company/clients');
    } else if (href === '/company/contacts') {
      event.preventDefault();
      handleNavigation('/company/contacts');
    } else if (href === '/company/feedback') {
      event.preventDefault();
      handleNavigation('/company/feedback');
    } else if (href === '/catalog/category/subcategory') {
      event.preventDefault();
      handleNavigation('/catalog/category/subcategory');
    } else if (href === '/catalog/category/kart') {
      event.preventDefault();
      handleNavigation('/catalog/category/kart');
    } else if (href.match(/^\/catalog\/[a-zA-Z0-9-]+$/)) {
      const slug = href.split('/').pop();
      if (!['category', 'klim', 'kart'].includes(slug)) {
        event.preventDefault();
        console.log('Перехват клика по ссылке каталога:', href);
        handleNavigation(href);
      }
    } else if (
      href.startsWith('/catalog/category/') &&
      !href.includes('klim') &&
      !href.includes('kart')
    ) {
      event.preventDefault();
      handleNavigation(href);
    } else if (href.match(/^\/catalog\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/)) {
      // Обработчик для ссылок вида /catalog/[catalogSlug]/[subcatalogSlug]
      event.preventDefault();
      console.log('Перехват клика по ссылке субкаталога:', href);
      handleNavigation(href);
    } else if (
      href.match(/^\/catalog\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/)
    ) {
      event.preventDefault();
      console.log('Перехват клика по ссылке продукта:', href);
      handleNavigation(href);
    }
  });

  window.onpopstate = () => {
    router();
  };

  // Если cartCount не существует в localStorage, установим его в 0
  if (!localStorage.getItem('cartCount')) {
    localStorage.setItem('cartCount', '0');
  }

  // Обновляем отображение счетчика
  const cartCountElement = document.querySelector('.cart-icon__count');
  if (cartCountElement) {
    cartCountElement.textContent = localStorage.getItem('cartCount');
  }

  // Use passive event listeners for better scroll performance
  document.addEventListener('scroll', null, { passive: true });
  document.addEventListener('touchstart', null, { passive: true });
  document.addEventListener('touchmove', null, { passive: true });

  router();
});

// Экспортируем функцию router, чтобы она была доступна глобально
window.router = router;
