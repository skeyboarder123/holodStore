import { initializeSlider } from '../UI/slider.js';
import { initializeForm } from '../UI/form.js';

import { html, render } from '/node_modules/lit-html/lit-html.js';
import api from '../../api/api.js';
import { setMetaTags } from '../hooks/metaTags.js';
import { getRecommendedStockTemplate } from '../Modules/recommendedStock.js';
import { getCatalogListTemplate } from '../Modules/catalogList.js';
import { getOrderFormTemplate } from '../UI/orderForm.js';
import { getServicesNavTemplate } from '../Modules/servicesNav.js';

export async function loadHome() {
  let catalogs = [];
  const content = document.getElementById('main_content');

  try {
    catalogs = await api.getCatalogs();
    const articles = await api.getArticles();
    const recommendedStock = await api.getRecommendedStock();

    console.log(articles);

    setMetaTags({
      title: catalogs.meta.title,
      description: catalogs.meta.description,
      keywords: catalogs.meta.keywords,
    });

    render(
      html`
        <section class="section-main section-main--no-min-height">
          <div class="main-container">
            <h1>
              Точка Холода <br />
              Всё для климата!
            </h1>

            <div class="happyman">
              <img
                width="680"
                height="240"
                style="width: 100%; height: 100%"
                src="imgs/happyman.webp"
                alt="мужчина на стуле"
                loading="lazy"
              />
            </div>

            <div class="blackCondey">
              <img
                class="blackCondey__img"
                width="440"
                height="220"
                src="imgs/webp/condeyBlack.webp"
                alt="черный кондиционер"
                loading="lazy"
              />

              <img
                width="330"
                height="160"
                src="imgs/webp/wind.webp"
                alt="свежий ветер"
                loading="lazy"
              />
            </div>

            <div class="button-container">
              <button class="button-main openFormBtn">
                Заказать сейчас!
              </button>
            </div>

            ${getOrderFormTemplate({ type: 'order' })}
          </div>
        </section>

        <main style="width: 100%; height: auto">
          <section
            style="
        border-bottom: 0.5px solid rgb(224, 224, 224);
        background: #fff;
      "
          >
            <div
              class="main-container"
              style="padding-top: 4vw; padding-bottom: 4vw"
            >
              <h2>Рекомендуемые товары</h2>
              ${getRecommendedStockTemplate({ recommendedStock })}
            </div>
          </section>
          <section
            style="
          width: 100%;
          height: auto;
          border-bottom: 0.5px solid rgb(224, 224, 224);
          background: #fff;
        "
          >
            <div
              class="main-container"
              style="padding-top: 4vw; padding-bottom: 4vw"
            >
              <h2>Каталог товаров</h2>
              ${getCatalogListTemplate({ catalogs, mainPage: true })}
            </div>
          </section>

          <section
            class="section-slider"
            style="
                background: #f2f6ff;
                width: 100%;
                height: 100%;
                padding-bottom: 4vw;
                padding-top: 4vw;
              "
          >
            <div class="main-container">
              <h2 style="width: 100%; margin-bottom: 4vw">
                Примеры выполненных работ
              </h2>
            </div>

            <div class="slider">
              <div class="slider-track">
                <div class="slider-item-1">
                  <div class="slider-item-1-text">
                    <h2 class="slider-item-1-text-grad">
                      Fresenius-kabi <br />
                      (Фрезениус каби)
                    </h2>
                  </div>

                  <a
                    class="slider-item-1-button adaptive-text__company"
                    href="/company/clients"
                    >Подробнее</a
                  >
                </div>
                <div class="slider-item-1 slider-item-2">
                  <div class="slider-item-1-text">
                    <h2 class="slider-item-1-text-grad">
                      Herbalife <br />
                      (Гербалайф)
                    </h2>
                  </div>

                  <a
                    class="slider-item-1-button adaptive-text__company    "
                    href="/company/clients"
                    >Подробнее</a
                  >
                </div>
                <div class="slider-item-1 slider-item-3">
                  <div class="slider-item-1-text">
                    <h2 class="slider-item-1-text-grad">
                      Coca-Cola <br />
                      (Кока-кола)
                    </h2>
                  </div>

                  <a
                    class="slider-item-1-button adaptive-text__company"
                    href="/company/clients"
                    >Подробнее</a
                  >
                </div>
                <div class="slider-item-1 slider-item-4">
                  <div class="slider-item-1-text">
                    <h2 class="slider-item-1-text-grad">Убер <br />(Uber)</h2>
                  </div>

                  <a
                    class="slider-item-1-button adaptive-text__company"
                    href="/company/clients"
                    >Все работы</a
                  >
                </div>
              </div>

              <div class="slider-indicators">
                <div class="indicator active"></div>
                <div class="indicator"></div>
                <div class="indicator"></div>
                <div class="indicator"></div>
              </div>
            </div>
          </section>

          <section
            style="padding-top: 4vw; padding-bottom: 4vw; background: #f2f6ff"
          >
            ${getServicesNavTemplate({ articles })}
          </section>

          <section
            style="padding-top: 4vw; padding-bottom: 4vw; background: #f2f6ff"
          >
            <div class="main-container">
              <h2>Интернет-магазин климатической техники</h2>

              <div class="adaptive-text__company">
                <p style="margin-bottom: 2vw">
                  Интернет-магазин компании &laquo;Точка Холода&raquo; уже
                  23&nbsp;года успешно продаёт в&nbsp;Москве климатическую
                  технику для дома, устанавливает промышленное климатическое
                  оборудование, проектирует системы вентиляции
                  и&nbsp;кондиционирования. Сейчас, в&nbsp;ассортименте нашего
                  интернет-магазина насчитывается более 35&nbsp;тысяч товарных
                  позиций. Мы&nbsp;регулярно расширяем спектр продаваемых
                  товаров, вовремя реагируя на&nbsp;ожидания своих покупателей.
                </p>
                <p style="margin-bottom: 2vw">
                  Продажа кондиционеров под ключ, их&nbsp;сервисное обслуживание
                  или ремонт, это то&nbsp;с&nbsp;чего мы&nbsp;начинали свой
                  путь, где стали экспертами и&nbsp;надёжными партнёрами для
                  своих клиентов. Сейчас, спустя два десятка лет, накопленный
                  опыт и&nbsp;высокий уровень компетенции наших инженеров,
                  позволяют нам браться за&nbsp;выполнение самых сложных
                  проектов, относящихся к&nbsp;области вентиляционного
                  оборудования или промышленного кондиционирования.
                </p>
                <p style="margin-bottom: 2vw">
                  Наш авторизованный сервисный центр, готов быстро,
                  а&nbsp;главное качественно отремонтировать практически любую
                  вентиляционную установку или сплит-систему. Аккуратно
                  осуществить монтаж нового и&nbsp;демонтаж вашего старого
                  климатического оборудования. Очистить кондиционер или
                  вентиляцию от&nbsp;пыли и&nbsp;бактерий. Сервисная служба
                  компании постоянно улучшает качество своих услуг, внимательно
                  прислушиваясь к&nbsp;пожеланиям наших дорогих клиентов.
                </p>
                <p style="margin-bottom: 2vw">
                  Компания &laquo;Точка Холода&raquo; является официальным
                  дилером Daikin, Mitsubishi Electric (aircon), Mitsubishi
                  Heavy, Hisense, Haier, IGC, Midea, Ballu, General Climate,
                  Electrolux, Fuji Electric, Gree, LG, Sakura, Samsung, Toshiba
                  и&nbsp;других известных марок. Мы&nbsp;получаем климатическое
                  оборудование непосредственно от&nbsp;завода производителя.
                  Фирмы посредники исключены из&nbsp;цепочки поставки, поэтому
                  наша цена ниже чем у&nbsp;большей части конкурентов. Для
                  постоянных клиентов предлагаем особые условия сотрудничества
                  с&nbsp;персональным прайс-листом.
                </p>

                <p style="margin-bottom: 2vw">
                  Зайдя в&nbsp;наш магазин климатической техники,
                  Вы&nbsp;сможете не&nbsp;только купить интересующую вас модель
                  сплит-системы или вентиляционной установки, но&nbsp;также
                  заказать доставку купленного оборудования в&nbsp;пределах
                  Москвы и&nbsp;Московской области, заключить договор
                  на&nbsp;его профессиональный монтаж и&nbsp;сервисное
                  обслуживание.
                </p>

                <p>
                  Позвоните нам по&nbsp;телефону, напишите в&nbsp;онлайн-чат или
                  пришлите свой запрос на&nbsp;электронную почту отдела продаж.
                  Наши сотрудники подробно ответят на&nbsp;Ваши вопросы,
                  расскажут про действующие скидки, а&nbsp;оптовым покупателям,
                  подготовят интересное коммерческое предложение.
                </p>
              </div>
            </div>
          </section>
        </main>
      `,
      content
    );

    initializeSlider();
    initializeForm();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    render(
      html`
        <div>Произошла ошибка при загрузке данных</div>
      `,
      content
    );
  }
}
