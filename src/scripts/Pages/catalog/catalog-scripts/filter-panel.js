import { html, render } from '/node_modules/lit-html/lit-html.js';

class FilterPanel extends HTMLElement {
  constructor() {
    super();
    this.root = this;

    // Начальное состояние фильтров
    this.state = {
      searchQuery: '',
      priceRange: [500, 744000],
      selectedFilters: {},
      detail_names: [],
      detail_descriptions: [],
    };

    // Свойства для работы с каталогами
    this.catalogSlug = '';
    this.subcatalogSlug = '';
    this.subcatalogData = [];

    // Привязка методов
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.toggleSection = this.toggleSection.bind(this);

    this.subcatalogDataValues = [];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.updateDetailData(this.subcatalogData);
    render(this.template(), this.root);
    setTimeout(() => this.updatePriceProgressBar(), 0);
  }

  handleSearchInput(e) {
    this.state = {
      ...this.state,
      searchQuery: e.target.value,
    };
    this.render();
    this.handleSearch();
  }

  // Получение уникальных значений для каждого поля
  getUniqueValues(fieldName) {
    return [
      ...new Set(
        this.subcatalogData
          .filter((item) => item.details && item.details[fieldName])
          .map((item) => item.details[fieldName])
      ),
    ];
  }

  // Обработчик изменения фильтров
  handleFilterChange(fieldName, value, checked = null) {
    if (!this.state.selectedFilters[fieldName]) {
      this.state.selectedFilters[fieldName] = {};
    }

    if (checked !== null) {
      // Для чекбоксов
      this.state.selectedFilters[fieldName][value] = checked;
    } else {
      // Для селектов
      this.state.selectedFilters[fieldName] = value;
    }

    this.render();
    this.handleSearch();
  }

  toggleSection(name) {
    requestAnimationFrame(() => {
      const content = this.root.querySelector(
        `.filter-section[data-name="${name}"] .filter-content`
      );
      if (content) {
        if (!this.state[`${name}_expanded`]) {
          content.style.height = content.scrollHeight + 'px';
        } else {
          content.style.height = '0px';
        }
      }
      this.state[`${name}_expanded`] = !this.state[`${name}_expanded`];
      this.render();
    });
  }

  template() {
    return html`
      <style>
        @media (max-width: 1024px) {
        }

        .filter-content {
          position: relative;
          height: 0;
          overflow: hidden;
          transition: height 0.2s ease;
        }

        .filter-content.expanded {
          height: fit-content;
          padding: 0.5vw 0;
        }

        .filter-content > div {
          position: relative;
          padding: 0;
        }

        .toggle-icon {
          display: inline-block;
          width: 0.5vw;
          height: 0.5vw;
          border-right: 2px solid #333;
          border-bottom: 2px solid #333;
          transform: rotate(45deg);
          transition: transform 0.2s ease;
          margin-top: -5px;
        }

        .toggle-icon.expanded {
          transform: rotate(-135deg);
          margin-top: 5px;
        }

        .filter-section {
          margin-bottom: 0.8vw;
        }

        .filter-section span {
          text-align: left;
          font-weight: 500;
          margin: 0;
          user-select: none;
        }

        .search-section .filter-content,
        .price-section .filter-content {
          height: auto;
          overflow: visible;
          margin-bottom: 1vw;
        }
      </style>

      <div class="filter-panel">
        <div class="search-section">
          <h3 style="margin-bottom: 1vw;">
            Поиск
          </h3>
          <div class="filter-content">
            <div>
              <input
                style="width: 100%"
                placeholder="Искать товары..."
                .value="${this.state.searchQuery}"
                @input="${this.handleSearchInput}"
              />
            </div>
          </div>
        </div>

        <div class="price-section">
          <h3 style="margin-bottom: 1vw;">
            Цена
          </h3>
          <div class="filter-content">
            <div>
              <div class="price-range">
                <div class="price-values adaptive-text__company">
                  <span>руб. ${this.state.priceRange[0].toLocaleString()}</span>
                  <span>руб. ${this.state.priceRange[1].toLocaleString()}</span>
                </div>
                <div class="range-slider">
                  <input
                    type="range"
                    min="500"
                    max="744000"
                    .value="${this.state.priceRange[0]}"
                    @input="${(e) => this.handlePriceRangeChange(e, 0)}"
                    class="range-min"
                  />
                  <input
                    type="range"
                    min="500"
                    max="744000"
                    .value="${this.state.priceRange[1]}"
                    @input="${(e) => this.handlePriceRangeChange(e, 1)}"
                    class="range-max"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        ${this.state.detail_names
          .filter((name) => name !== 'Поиск' && name !== 'Цена')
          .map(
            (name) => html`
              <div class="filter-section" data-name="${name}">
                <span
                  style="cursor: pointer; display: flex; justify-content: space-between; align-items: center;"
                  class="stock-text"
                  @click="${() => this.toggleSection(name)}"
                >
                  ${name}
                  <span
                    class="toggle-icon ${this.state[`${name}_expanded`]
                      ? 'expanded'
                      : ''}"
                  ></span>
                </span>
                <div
                  class="filter-content ${this.state[`${name}_expanded`]
                    ? 'expanded'
                    : ''}"
                >
                  <div>
                    ${this.renderFilterByType(name)}
                  </div>
                </div>
              </div>
            `
          )}
      </div>
    `;
  }

  renderFilterByType(name) {
    const values = this.getUniqueValues(name);
    return html`
      <div class="checkbox-group">
        ${values.map(
          (value) => html`
            <div class="">
              <label
                style="display: flex; user-select: none; gap: 0.5vw; align-items: center;"
              >
                <input
                  type="checkbox"
                  .checked="${this.state.selectedFilters[name]?.[value] ||
                    false}"
                  @change="${(e) =>
                    this.handleFilterChange(name, value, e.target.checked)}"
                />
                <span class="checkmark"></span>
                <p class="adaptive-text__company">${value}</p>
              </label>
            </div>
          `
        )}
      </div>
    `;
  }

  updateDetailData(data) {
    if (data && data[0] && data[0].details) {
      // Сохраняем состояние развернутых/свернутых секций
      const expandedStates = {};
      if (this.state.detail_names) {
        this.state.detail_names.forEach((name) => {
          expandedStates[`${name}_expanded`] = this.state[`${name}_expanded`];
        });
      }

      this.state.detail_names = Object.keys(data[0].details);
      this.state.detail_descriptions = data.map((item) =>
        Object.values(item.details)
      );

      console.log(this.state.detail_descriptions, this.state);

      // Инициализируем состояние развернутых/свернутых секций для новых полей
      this.state.detail_names.forEach((name) => {
        if (expandedStates[`${name}_expanded`] === undefined) {
          expandedStates[`${name}_expanded`] = false;
        }
      });

      // Восстанавливаем состояние
      Object.assign(this.state, expandedStates);
    }
  }

  resetFilters() {
    this.state.selectedFilters = {};
    this.state.searchQuery = '';
    this.state.priceRange = [500, 744000];
    this.render();
    this.handleSearch();
  }

  handleSearch() {
    console.log('Handle search with filters:', this.state.selectedFilters);

    // Собираем активные фильтры
    const filters = {
      query: this.state.searchQuery,
      minPrice: this.state.priceRange[0],
      maxPrice: this.state.priceRange[1],
      ...this.state.selectedFilters,
      catalogSlug: this.catalogSlug,
      subcatalogSlug: this.subcatalogSlug,
    };

    // Если есть глобальная функция applyFilters, вызываем ее
    if (typeof window.applyFilters === 'function') {
      window.applyFilters(filters);
    } else {
      console.warn('Функция applyFilters не найдена в глобальном контексте');
    }
  }

  updatePriceProgressBar() {
    const slider = this.root.querySelector('.range-slider');
    const minInput = this.root.querySelector('.range-min');
    const maxInput = this.root.querySelector('.range-max');

    if (!slider || !minInput || !maxInput) {
      console.error('Slider elements not found');
      return;
    }

    const minValue = parseInt(minInput.value);
    const maxValue = parseInt(maxInput.value);
    const minRange = parseInt(minInput.min);
    const maxRange = parseInt(maxInput.max);

    const leftPercent = ((minValue - minRange) / (maxRange - minRange)) * 100;
    const rightPercent = ((maxValue - minRange) / (maxRange - minRange)) * 100;

    slider.style.setProperty('--progress-left', `${leftPercent}%`);
    slider.style.setProperty(
      '--progress-width',
      `${rightPercent - leftPercent}%`
    );
  }

  handlePriceRangeChange(e, index) {
    const newValue = parseInt(e.target.value);
    const minRange = parseInt(e.target.min);
    const maxRange = parseInt(e.target.max);

    // Ограничиваем значение в пределах допустимого диапазона
    const clampedValue = Math.min(Math.max(newValue, minRange), maxRange);
    this.state.priceRange[index] = clampedValue;

    if (index === 0 && this.state.priceRange[0] > this.state.priceRange[1]) {
      this.state.priceRange[0] = this.state.priceRange[1];
    } else if (
      index === 1 &&
      this.state.priceRange[1] < this.state.priceRange[0]
    ) {
      this.state.priceRange[1] = this.state.priceRange[0];
    }
    this.render();

    // Добавляем задержку для обновления при перетаскивании ползунка
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }
    this._debounceTimer = setTimeout(() => {
      this.handleSearch();
    }, 300);
  }

  setupEventListeners() {
    const slider = this.root.querySelector('.range-slider');
    if (slider) {
      // Добавляем стили для ограничения ползунков
      slider.style.position = 'relative';
      slider.style.overflow = 'hidden';

      // Ограничиваем область клика
      slider.addEventListener('click', (e) => {
        const rect = slider.getBoundingClientRect();
        const clickPosition = Math.min(
          Math.max(e.clientX - rect.left, 0),
          rect.width
        );
        const sliderWidth = rect.width;
        const clickPercent = (clickPosition / sliderWidth) * 100;

        // Определяем, какой ползунок ближе к точке клика
        const minInput = this.root.querySelector('.range-min');
        const maxInput = this.root.querySelector('.range-max');
        const minValue = parseInt(minInput.value);
        const maxValue = parseInt(maxInput.value);
        const minRange = parseInt(minInput.min);
        const maxRange = parseInt(maxInput.max);

        const minPercent =
          ((minValue - minRange) / (maxRange - minRange)) * 100;
        const maxPercent =
          ((maxValue - minRange) / (maxRange - minRange)) * 100;

        const distanceToMin = Math.abs(clickPercent - minPercent);
        const distanceToMax = Math.abs(clickPercent - maxPercent);

        if (distanceToMin < distanceToMax) {
          // Перемещаем минимальный ползунок
          const newValue = Math.round(
            (clickPercent / 100) * (maxRange - minRange) + minRange
          );
          if (newValue < maxValue) {
            this.handlePriceRangeChange(
              { target: { value: newValue, min: minRange, max: maxRange } },
              0
            );
          }
        } else {
          // Перемещаем максимальный ползунок
          const newValue = Math.round(
            (clickPercent / 100) * (maxRange - minRange) + minRange
          );
          if (newValue > minValue) {
            this.handlePriceRangeChange(
              { target: { value: newValue, min: minRange, max: maxRange } },
              1
            );
          }
        }
      });
    }
  }
}

customElements.define('filter-panel', FilterPanel);
