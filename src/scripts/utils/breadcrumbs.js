import { html } from '/node_modules/lit-html/lit-html.js';

function generateBreadcrumbsFromUrl() {
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter((segment) => segment !== '');

  const routes = [];
  let currentPath = '';

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    routes.push({
      name,
      path: currentPath,
    });
  });
  return routes;
}

export function getBreadcrumbsTemplate() {
  const breadcrumbRoutes = generateBreadcrumbsFromUrl();

  return html`
    <nav class="breadcrumbs">
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <a href="/" class="breadcrumbs__link adaptive-text__company"
            >Главная</a
          >
          ${breadcrumbRoutes.length > 0
            ? html`
                <span class="breadcrumbs__separator">/</span>
              `
            : ''}
        </li>
        ${breadcrumbRoutes.map(
          (route, index) => html`
            <li class="breadcrumbs__item">
              ${index === breadcrumbRoutes.length - 1
                ? html`
                    <span class="breadcrumbs__text adaptive-text__company"
                      >${route.name}</span
                    >
                  `
                : html`
                    <a
                      href="${route.path}"
                      class="breadcrumbs__link adaptive-text__company"
                      >${route.name}</a
                    >
                    <span class="breadcrumbs__separator adaptive-text__company"
                      >/</span
                    >
                  `}
            </li>
          `
        )}
      </ul>
    </nav>
  `;
}
