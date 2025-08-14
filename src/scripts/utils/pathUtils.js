// Утилиты для работы с путями в production и development

/**
 * Получает базовый путь приложения
 * В development: '/'
 * В production: может быть '/subdirectory/' для GitHub Pages или другой базовый путь
 */
export function getBasePath() {
  // Если мы на localhost, используем корневой путь
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    return '/';
  }

  // Для GitHub Pages используем фиксированный базовый путь
  if (window.location.hostname.includes('github.io')) {
    return '/holodStore/';
  }

  // Для других хостингов - используем корневой путь
  return '/';
}

/**
 * Нормализует путь для текущего окружения
 * @param {string} path - Относительный путь (например, '/catalog', '/services')
 * @returns {string} - Нормализованный путь
 */
export function normalizePath(path) {
  const basePath = getBasePath();

  // Убираем ведущий слеш из path если он есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Если basePath не корневой, добавляем его
  if (basePath !== '/') {
    return basePath + cleanPath;
  }

  return '/' + cleanPath;
}

/**
 * Получает текущий относительный путь без базового пути
 * @returns {string} - Относительный путь
 */
export function getCurrentRelativePath() {
  const basePath = getBasePath();
  const currentPath = window.location.pathname;

  // Убираем базовый путь из текущего
  if (basePath !== '/' && currentPath.startsWith(basePath)) {
    const relativePath = currentPath.slice(basePath.length - 1);
    return relativePath || '/';
  }

  return currentPath;
}

/**
 * Проверяет, совпадает ли текущий путь с заданным
 * @param {string} targetPath - Путь для проверки
 * @returns {boolean}
 */
export function isCurrentPath(targetPath) {
  const relativePath = getCurrentRelativePath();
  return relativePath === targetPath;
}

/**
 * Создает правильную ссылку для navigation
 * @param {string} path - Относительный путь
 * @returns {string} - Полный путь для href
 */
export function createHref(path) {
  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    return path; // В development используем как есть
  }

  // В production используем относительные пути
  if (path === '/') {
    return './';
  }

  // Убираем ведущий слеш и делаем относительным
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return './' + cleanPath;
}

/**
 * Обновляет все ссылки на странице для текущего окружения
 */
export function updateLinksForEnvironment() {
  const links = document.querySelectorAll('a[href^="/"]');

  links.forEach((link) => {
    const href = link.getAttribute('href');
    const newHref = createHref(href);
    link.setAttribute('href', newHref);
  });
}
