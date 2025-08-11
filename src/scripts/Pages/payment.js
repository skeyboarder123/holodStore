import { html, render } from '/node_modules/lit-html/lit-html.js';
import cartManager from '../utils/cart.js';
import { formatPrice } from '../hooks/formatPrice.js';

export function loadPay() {
  const content = document.getElementById('main_content');
  // Проверяем, пришли ли мы из прямой покупки или из корзины
  const directBuyData = JSON.parse(localStorage.getItem('directBuy'));
  const cartItems = cartManager.getItems();

  const total = directBuyData ? directBuyData.total : cartManager.getTotal();
  const items = directBuyData ? [directBuyData] : Object.values(cartItems);

  render(
    html`
      <section style="background-color: #f2f6ff" class="section-main">
        <div class="main-container ">
          <h2 class="margin">Сбор заказа</h2>
          <div class="payment-container">
            <div class="payment-container-info">
              <h3 class="margin">Данные покупателя</h3>
              <div class="margin">
                <div class="payment-container-info-buttons">
                <button class="button-primary">Физическое лицо</button>
                <button class="button-primary">
                  Юридическое лицо
                </button>
              </div>
            </div>
            <div style="width: 100%;">
              <div class="" style="width: 100%; margin-bottom: 2vw;">
                <div
                  class="payment-container-info-form"
                >
                  <div style="display: flex; flex-direction: column;">
                    <label
                      class="adaptive-text__company"
                      for="name"
                      style="margin-bottom: 0.5vw; color: #14193c;"
                      >Ваше имя*</label
                    >
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Ваше имя"
                      class="payment-container-info-form-input"
                      required
                    />
                  </div>
                  <div style="display: flex; flex-direction: column;">
                    <label
                      class="adaptive-text__company"
                      for="phone"
                      style="margin-bottom: 0.5vw; color: #14193c;"
                      >Номер телефона*</label
                    >
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Номер телефона"
                      class="payment-container-info-form-input"
                      required
                    />
                  </div>
                  <div style="display: flex; flex-direction: column;">
                    <label
                      class="adaptive-text__company"
                      for="email"
                      style="margin-bottom: 0.5vw; color: #14193c;"
                      >Email*</label
                    >
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      class="payment-container-info-form-input"
                      required
                    />
                  </div>
                  <div style="display: flex; flex-direction: column;">
                    <label
                      for="text"
                      class="adaptive-text__company"
                      style="margin-bottom: 0.5vw; color: #14193c; text-wrap: nowrap;"
                      >Примечание к заказу</label
                    >
                    <input
                      type="text"
                      id="note"
                      name="text"
                      placeholder="Примечание к заказу"
                      class="payment-container-info-form-input"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 class="margin">Выберите способ получения</h3>
              <div class="payment-container-info-buttons">
                <button class="button-primary">Самовывоз</button>
                <button class="button-primary">
                  Доставка от 500 руб.
                </button>
              </div>
            </div>
            <div class="payment-container-map">
              <!-- Текстовый блок -->
              <div
                class="payment-container-map-text-container"
              >
                <p
                  class="adaptive-text__company"
                  style="color: #14193c; font-weight: bold;"
                >
                  Самовывоз по адресу:
                </p>
              <div class="payment-container-map-text-container-text">
                <p class="adaptive-text__company" style="color: #14193c;">
                г. Москва, ул. Пруд-Ключики 5.
                </p>
                <p class="adaptive-text__company" style="color: #14193c;">
                  Время работы:
                </p>
                <p class="adaptive-text__company" style="color: #14193c;">
                  Пн-Чт 9:00-18:00, Пт 9:00-17:00.
                </p>
              </div>
              </div>
              <!-- Блок с картой -->
              <div
                id="map-container"
                class="payment-container-map-map"
              ></div>
            </div>
            <h3 class="margin">Выберите способ оплаты</h3>
              <div class="payment-container-info-buttons">
              <button class="button-primary active">Онлайн</button>
              <button class="button-primary">
                При получении
              </button>
              <button
                class="button-grey"
               
              >
                В кредит
              </button>
            </div>
            <div
              class="payment-methods-container pudding"
              style=""
            >
              <div class="payment-method">
                <input type="radio" name="payment-method" value="sbp" style="display: none;"  />
                <div class="payment-method-icon">
                  <img
                    src="/svgs/sbp.svg"                    
                    alt="система быстрых платежей"
                  />
                </div>
              </div>
              <div class="payment-method">
                <input type="radio" name="payment-method" value="spay" style="display: none;" />
                <div class="payment-method-icon">
                  <img
                    src="/svgs/t-pain.svg"
                    alt="SPay"
                  />
                </div>
              </div>
              <div class="payment-method">
                <input type="radio" name="payment-method" value="sber" style="display: none;" />
                <div class="payment-method-icon">
                  <img
                    src="/svgs/sberik.svg"
                    alt="GPay"
                  />
                </div>
              </div>
              <div class="payment-method">
                <input type="radio" name="payment-method" value="yoomoney" style="display: none;" />
                <div class="payment-method-icon">
                  <img
                    src="/svgs/uminey.svg"
                    alt="YooMoney"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="buck-panel">
            <h3 style="margin-bottom: 2vw; padding:0;">Информация о заказе</h3>
            ${Object.values(cartManager.getItems()).map(
              (item) => html`
                <div style="display: flex; justify-content: space-between;">
                  <div
                    style="display: flex; flex-direction: column; gap: 0.3vw;"
                  >
                    <p class="adaptive-text__company" style="font-weight: 600;">
                      ${item.name}
                    </p>
                    <p class="adaptive-text__company" style="opacity: 0.7;">
                      Количество: ${item.quantity} шт.
                    </p>
                  </div>
                  <p
                    class="adaptive-text__company"
                    style="font-weight: 600; text-wrap: nowrap;"
                  >
                    ${formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              `
            )}
            <div
              style="height: 1px; background-color: #e0e0e0; margin: 1vw 0;"
            ></div>
            <div
              style="display: flex; justify-content: space-between; margin-bottom: 1vw;"
            >
              <p class="adaptive-text__company" style="font-weight: 700;">
                Итого:
              </p>
              <p class="adaptive-text__company" style="font-weight: 700;">
                ${formatPrice(total)}
              </p>
            </div>
            <button class="button-primary">
              Подтвердить заказ
            </button>
          </div>
        </div>
      </section>
    `,
    content
  );

  // Инициализация карты
  if (typeof ymaps !== 'undefined') {
    ymaps.ready(initMap);
  } else {
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.onload = () => {
      ymaps.ready(initMap);
    };
    document.head.appendChild(script);
  }

  function initMap() {
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      const myMap = new ymaps.Map(mapContainer, {
        center: [55.749395, 37.721184], // Координаты центра карты (Москва, ул. Пруд-Ключики 5)
        zoom: 17, // Уровень масштабирования
      });

      // Добавляем маркер на карту
      const placemark = new ymaps.Placemark([55.749395, 37.721184], {
        hintContent: 'г. Москва, ул. Пруд-Ключики 5',
        balloonContent: 'Самовывоз по адресу: г. Москва, ул. Пруд-Ключики 5',
      });

      myMap.geoObjects.add(placemark);
    }
  }

  // После успешной оплаты:
  function handleSuccessfulPayment() {
    if (directBuyData) {
      localStorage.removeItem('directBuy');
    } else {
      cartManager.clearCart();
    }
    // Редирект на страницу успешной оплаты или главную
  }

  // Добавляем обработчик выбора способа оплаты
  const paymentMethods = document.querySelectorAll('.payment-method');
  paymentMethods.forEach((method) => {
    method.addEventListener('click', () => {
      // Удаляем активный класс у всех методов
      paymentMethods.forEach((m) => m.classList.remove('active'));
      // Добавляем активный класс выбранному методу
      method.classList.add('active');
    });
  });
}
