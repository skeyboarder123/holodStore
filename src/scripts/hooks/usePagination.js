export function usePagination(items, itemsPerPage = 9) {
  // Состояние для отслеживания текущей страницы
  let currentPage = 1;

  // Функция для получения элементов текущей страницы
  function getCurrentPageItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }

  // Функция для расчета общего количества страниц
  function getTotalPages() {
    return Math.ceil(items.length / itemsPerPage);
  }

  // Функция для изменения страницы
  function changePage(page) {
    currentPage = page;
    return getCurrentPageItems();
  }

  // Функция для сброса на первую страницу
  function resetToFirstPage() {
    currentPage = 1;
    return getCurrentPageItems();
  }

  return {
    currentPage,
    getCurrentPageItems,
    getTotalPages,
    changePage,
    resetToFirstPage,
  };
}
