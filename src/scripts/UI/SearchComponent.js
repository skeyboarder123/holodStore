import { html } from '/node_modules/lit-html/lit-html.js';

/**
 * Компонент поиска
 * @param {Object} props - Свойства компонента
 * @param {string} props.placeholder - Текст подсказки в поле ввода
 * @param {string} props.buttonText - Текст кнопки поиска
 * @param {Function} props.onSearch - Функция обратного вызова при поиске
 * @param {string} props.searchQuery - Текущее значение поискового запроса
 * @returns {TemplateResult} HTML-шаблон компонента
 */
export function SearchComponent(props) {
  const {
    placeholder = 'Искать товары...',
    buttonText = 'Поиск',
    onSearch,
    searchQuery = '',
  } = props;

  return html`
    <div class="catalog-input">
      <label>
        <h2 class="search-title">Поиск</h2>
        <div
          style="display:flex; justify-content: space-between;"
          class="adaptive-text__company"
        >
          <input
            class="search-input__inner"
            placeholder="${placeholder}"
            .value="${searchQuery}"
            @input="${(e) => onSearch(e.target.value)}"
          />
        </div>
      </label>
    </div>
  `;
}
