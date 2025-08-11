import { html, render } from '/node_modules/lit-html/lit-html.js';
import api from '../../../api/api.js';
import { setMetaTags } from '../../hooks/metaTags.js';
import { SearchComponent } from '../../UI/SearchComponent.js';
import { getCheckGreenTemplate } from '../../UI/checkGreen.js';
import { getBreadcrumbsTemplate } from '../../utils/breadcrumbs.js';
import { PaginationComponent } from '../../UI/PaginationComponent.js';
import { usePagination } from '../../hooks/usePagination.js';
// Объект с данными карточек

export async function loadCategory({ metaData, id, slug }) {
  const content = document.getElementById('main_content');

  // Получаем данные с бэкенда
  const catalogs = await api.getCatalogBySlug(slug);
  console.log('metaData', metaData, id, slug, catalogs);
  // Фильтруем подкаталоги по id каталога (catalog), если он передан
  const filteredCatalogs = id
    ? catalogs.results.filter((catalog) => catalog.catalog === parseInt(id))
    : catalogs.results;

  console.log('Catalog ID:', id, 'Filtered catalogs:', filteredCatalogs);

  // Установка метаданных
  const categoryMetaData =
    metaData ||
    (slug
      ? { title: `Категория ${slug}`, description: '', keywords: '' }
      : filteredCatalogs.length > 0
      ? filteredCatalogs[0].meta
      : catalogs.meta);

  if (categoryMetaData) {
    setMetaTags({
      title: categoryMetaData.title || 'Категория товаров',
      description: categoryMetaData.description || '',
      keywords: categoryMetaData.keywords || '',
    });
  }

  // Состояние для отслеживания поискового запроса
  let searchQuery = '';

  // Инициализация хука пагинации
  const pagination = usePagination(filteredCatalogs);

  // Функция для фильтрации карточек по поисковому запросу
  function filterCards(query) {
    if (!query) return filteredCatalogs;
    return filteredCatalogs.filter((card) =>
      card.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Функция для рендеринга карточек
  function renderCards(filteredCatalogs) {
    return filteredCatalogs.map(
      (card) => html`
        <div class="storeStock">
          <a href="/catalog/${slug}/${card.slug}">
            <div class="storeStock__inner">
              <img
                style="max-width: 100%; height: 75%"
                src="${card.image}"
                alt="${card.title}"
              />
              <p class="stock-text">${card.name}</p>
            </div>
          </a>
        </div>
      `
    );
  }

  // Функция для обновления всего компонента
  function updateComponent() {
    const filteredCards = filterCards(searchQuery);
    const currentPageCards = pagination.getCurrentPageItems();
    const totalPages = pagination.getTotalPages();

    render(
      html`
        <section style="background-color: #fff" class="section-main">
          <div class="main-container">
            ${getBreadcrumbsTemplate()}
            <h2>${catalogs.name?.name || 'Категория товаров'}</h2>
            <div class="catalog-container-wrapper">
              <div class="catalog-container">
                <div class="catalog">
                  ${renderCards(currentPageCards)}
                </div>
              </div>

              ${SearchComponent({
                placeholder: 'Искать товары...',
                buttonText: 'Поиск',
                searchQuery: searchQuery,
                onSearch: (query) => {
                  searchQuery = query;
                  pagination.resetToFirstPage();
                  updateComponent();
                },
              })}
            </div>

            <div class="catalog-nav">
              ${PaginationComponent({
                currentPage: pagination.currentPage,
                totalPages,
                onPageChange: (page) => {
                  pagination.changePage(page);
                  updateComponent();
                },
              })}
            </div>

            ${getCheckGreenTemplate()}
          </div>
        </section>
      `,
      content
    );
  }

  // Инициализация компонента
  updateComponent();
}
