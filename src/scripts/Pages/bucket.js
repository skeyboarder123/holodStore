import { html, render } from '/node_modules/lit-html/lit-html.js';
import { Counter } from '../UI/Counter.js';
import cartManager from '../utils/cart.js';
import { formatPrice } from '../hooks/formatPrice.js';
import { renderProductItems } from '../Modules/productKart.js';

export function loadBuck() {
  const cartItems = cartManager.getItems();

  function renderContent() {
    const content = document.getElementById('main_content');
    const total = cartManager.getTotal();

    render(
      html`
        <section style="background-color: #f2f6ff" class="section-main">
          <div class="main-container">
            <h2>Корзина</h2>
            <div class="bucket-container-wrapper">
              <div class="subcatalog-container">
                ${renderProductItems(Object.values(cartItems), false)}
              </div>
              <div class="bucket-window">
                <div class="bucket-panel">
                  <h2 style="margin-bottom: 1vw;">Сумма заказов</h2>
                  <p style="" class="adaptive-text__company">
                    Информация о платеже, доставка и варианты оплаты будут
                    обновлены при оформлении заказа.
                  </p>

                  <p class="stock-text__sale pudding">
                    Итого:
                    <span style="font-weight: bold;;"
                      >${formatPrice(total)}</span
                    >
                  </p>

                  <a href="/payment"
                    ><button class="button-primary">Оформить заказ</button></a
                  >
                </div>
              </div>
            </div>

            <div class="catalog-nav">
              <nav>
                <ul>
                  <li class="adaptive-text__company catalog-nav-item">1</li>
                  <li class="adaptive-text__company catalog-nav-item">2</li>
                  <li class="adaptive-text__company catalog-nav-item">3</li>
                  <li class="adaptive-text__company catalog-nav-item">4</li>
                  <li class="adaptive-text__company catalog-nav-item">5</li>
                  <li>
                    <img
                      style="cursor:pointer"
                      src="/svgs/arrow-left-nav.svg"
                      alt="arrow"
                    />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      `,
      content
    );
  }

  // Добавляем слушатель события изменения корзины
  document.addEventListener('cartChange', (event) => {
    Object.assign(cartItems, event.detail.items);
    renderContent();
  });

  // Первичный рендер
  renderContent();
}
