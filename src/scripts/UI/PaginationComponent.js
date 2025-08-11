import { html } from '/node_modules/lit-html/lit-html.js';

export function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  // Добавляем кнопки для каждой страницы
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      html`
        <li
          class="adaptive-text__company catalog-nav-item ${i === currentPage
            ? 'active'
            : ''}"
          @click=${() => onPageChange(i)}
          style="cursor: pointer; background-color: #fff"
        >
          ${i}
        </li>
      `
    );
  }

  // Добавляем кнопку "назад"
  if (currentPage > 1) {
    pages.push(
      html`
        <li>
          <img
            style="cursor:pointer"
            src="/svgs/arrow-left-nav.svg"
            alt="arrow"
            @click=${() => onPageChange(currentPage - 1)}
          />
        </li>
      `
    );
  }

  // Добавляем кнопку "вперед"
  if (currentPage < totalPages) {
    pages.push(
      html`
        <li>
          <img
            style="cursor:pointer"
            src="/svgs/arrow-left-nav.svg"
            alt="arrow"
            @click=${() => onPageChange(totalPages)}
          />
        </li>
      `
    );
  }

  return html`
    <nav>
      <ul>
        ${pages}
      </ul>
    </nav>
  `;
}
