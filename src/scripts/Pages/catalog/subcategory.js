import './catalog-scripts/filter-panel.js';
import { html, render } from '/node_modules/lit-html/lit-html.js';
import api from '../../../api/api.js';
import { setMetaTags } from '../../hooks/metaTags.js';
import { formatPrice } from '../../hooks/formatPrice.js';
import { getCheckGreenTemplate } from '../../UI/checkGreen.js';
import { renderProductItems } from '../../Modules/productKart.js';
import { getBreadcrumbsTemplate } from '../../utils/breadcrumbs.js';
import { PaginationComponent } from '../../UI/PaginationComponent.js';
import { usePagination } from '../../hooks/usePagination.js';

export async function loadSubcategory({ metaData, slug, catalogSlug }) {
  const content = document.getElementById('main_content');

  console.log(window.location.pathname);

  console.log('Загрузка субкаталога:', { slug, catalogSlug });

  try {
    // Получаем данные субкаталога
    let subcatalogData;
    let filteredProducts = [];
    const pagination = usePagination(filteredProducts);

    subcatalogData = await api.getSubcatalogBySlug(catalogSlug, slug);
    console.log(subcatalogData);
    console.log('subcat', subcatalogData);

    // Инициализируем отфильтрованные товары
    filteredProducts = subcatalogData.results || [];

    // Установка метаданных
    const pageMetaData = metaData ||
      subcatalogData?.meta || {
        title: subcatalogData?.name || `Подкатегория ${slug || ''}`,
        description: subcatalogData?.description || '',
        keywords: subcatalogData?.keywords || '',
      };

    setMetaTags({
      title: pageMetaData.title || 'Подкатегория товаров',
      description: pageMetaData.description || '',
      keywords: pageMetaData.keywords || '',
    });

    // Обработчик фильтрации
    window.applyFilters = (filters) => {
      filteredProducts = subcatalogData.results.filter((product) => {
        if (filters.query) {
          const query = filters.query.toLowerCase();
          const productName = product.name.toLowerCase();
          const article = (product.article || '').toLowerCase();

          if (!productName.includes(query) && !article.includes(query)) {
            return false;
          }
        }

        const price = parseFloat(product.price);
        if (!isNaN(price)) {
          if (filters.minPrice && price < filters.minPrice) return false;
          if (filters.maxPrice && price > filters.maxPrice) return false;
        }

        if (product.details) {
          for (const [key, value] of Object.entries(filters)) {
            if (
              [
                'query',
                'minPrice',
                'maxPrice',
                'catalogSlug',
                'subcatalogSlug',
              ].includes(key)
            ) {
              continue;
            }

            if (typeof value === 'object' && value !== null) {
              const selectedValues = Object.entries(value)
                .filter(([_, isSelected]) => isSelected)
                .map(([val]) => val);

              if (
                selectedValues.length > 0 &&
                !selectedValues.includes(product.details[key])
              ) {
                return false;
              }
            } else if (value && product.details[key] !== value) {
              return false;
            }
          }
        }

        return true;
      });

      renderSubcatalogPage();
    };

    // Функция для рендеринга всей страницы
    const renderSubcatalogPage = () => {
      render(
        html`
          <section style="background-color: #fff" class="section-main">
            <div class="main-container">
              ${getBreadcrumbsTemplate()}
              <h2>${subcatalogData?.name || 'Подкатегория товаров'}</h2>
              <div class="subcatalog-container-wrapper">
                <div class="subcatalog-container">
                  ${renderProductItems(
                    filteredProducts,
                    slug,
                    catalogSlug,
                    true
                  )}
                  ${PaginationComponent({
                    currentPage: pagination.currentPage,
                    totalPages: pagination.getTotalPages(),
                    onPageChange: (page) => {
                      pagination.changePage(page);
                      renderSubcatalogPage();
                    },
                  })}
                </div>

                <div class="subcatalog-input">
                  <filter-panel
                    .catalogSlug=${catalogSlug}
                    .subcatalogSlug=${slug}
                    .subcatalogData=${subcatalogData.results}
                  ></filter-panel>
                </div>
              </div>

              ${getCheckGreenTemplate()}
            </div>
          </section>
        `,
        content
      );
    };

    // Инициализация страницы
    renderSubcatalogPage();
  } catch (error) {
    console.error('Ошибка при загрузке субкаталога:', error);
    // Показываем страницу с ошибкой или пустую страницу
    render(
      html`
        <section style="background-color: #f2f6ff" class="section-main">
          <div class="main-container">
            <h2>Ошибка при загрузке подкатегории</h2>
            <p>Не удалось загрузить данные. Пожалуйста, попробуйте позже.</p>
          </div>
        </section>
      `,
      content
    );
  }
}
