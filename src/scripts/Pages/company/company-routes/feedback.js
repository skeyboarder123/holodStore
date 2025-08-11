import { feedbackCollapse } from '../company-scripts/feedbackCollapse.js';
import { initializeImageZoom } from '../company-scripts/imageZoom.js';
import { html, render } from '/node_modules/lit-html/lit-html.js';
import api from '../../../../api/api.js';

export async function loadFeed() {
  const content = document.getElementById('main_content');
  const documents = await api.getDocuments();
  console.log(documents);

  // Добавляем переменную для отслеживания активной вкладки
  let showPrivate = true;

  // Функции для переключения вкладок
  const handlePrivateClick = () => {
    showPrivate = true;
    renderContent();
  };

  const handleCompanyClick = () => {
    showPrivate = false;
    renderContent();
  };

  const renderContent = () => {
    render(
      html`
        <section style="background-color: #f2f6ff" class="section-main">
          <div class="main-container">
            <h2 style="margin-bottom:2vw;">Отзывы</h2>

            <div class="adaptive-text__company">
              <p style="width: 100%;">
                Мы стараемся делать свою работу хорошо. Мы благодарим наших
                клиентов за высокое доверие и положительные отзывы о нашей
                работе. Дружный коллектив «Точки Холода» будет рад помочь и Вам.
                Если у Вас появилась необходимость купить климатическое
                оборудование или установить климатическую технику, выполнить
                техническое обслуживание кондиционера либо очистить
                вентиляционную систему от загрязнения, то тогда Вам точно к нам.
                В интернет-магазине «Точка Холода» более 45000 товаров для
                благоустройства комфортного микроклимата, мы предлагаем:
              </p>

              <!-- <ul style="padding: 1vw; text-decoration: underline;">
                <li style="list-style: disc;"><a href="#">Климатизаторы</a></li>
                <li style="list-style: disc;">
                  <a href="#">Оконные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Мобильные кондиционеры для помещений</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Автомобильные мобильные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Промышленные мобильные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Настенные сплит-системы</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Мульти-сплит системы</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Кассетные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Канальные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Колонные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Напольно-потолочные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Кондиционеры без наружного блока</a>
                </li>
                <li style="list-style: disc;"><a href="#">VRF системы</a></li>
                <li style="list-style: disc;"><a href="#">Фанкойлы</a></li>
                <li style="list-style: disc;"><a href="#">Чиллеры</a></li>
                <li style="list-style: disc;">
                  <a href="#">Крышные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Прецизионные кондиционеры</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Компрессорно-конденсаторные блоки</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Промышленные вентиляторы</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Проветриватели</a>
                </li>
                <li style="list-style: disc;"><a href="#">Бризеры</a></li>
                <li style="list-style: disc;">
                  <a href="#"
                    >Бытовые приточно-вытяжные вентиляционные установки</a
                  >
                </li>
                <li style="list-style: disc;">
                  <a href="#">Вытяжные вентиляционные установки</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Приточные вентиляционные установки</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Приточно-вытяжные вентиляционные установки</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Бойлеры косвенного нагрева</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Котлы отопления</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Тепловые насосы</a>
                </li>
                <li style="list-style: disc;">
                  <a href="#">Холодильные сплит-системы</a>
                </li>
              </ul>-->

              <div style="margin-top: 2vw;">
                <img
                  src="/imgs/webp/yarating.webp"
                  alt="rating"
                  class="rating-img"
                />
              </div>

              <div
                style="width:fit-content; margin: 4vw auto; display:flex; gap:1vw;"
                class="adaptive-text__company"
              >
                <span
                  style="margin-right:1.5vw; cursor:pointer; ${showPrivate
                    ? 'font-weight:bold; padding-bottom: 0.2vw; border-bottom:0.1vw solid rgba(0, 0, 0, 0.4);'
                    : ''}"
                  @click=${handlePrivateClick}
                >
                  Частных лиц
                </span>
                <span
                  style="cursor:pointer; ${!showPrivate
                    ? 'font-weight:bold; padding-bottom: 0.2vw; border-bottom:0.1vw solid rgba(0, 0, 0, 0.4);'
                    : ''}"
                  @click=${handleCompanyClick}
                >
                  Предприятий
                </span>
              </div>

              ${showPrivate
                ? html`
                    <div class="feedback-container">
                      <div class="feedback-card">
                        <div class="feedback-container__inner">
                          <div class="feedback-container__inner-img">
                            <img
                              style="width:100%; height:auto"
                              src="/imgs/webp/ivanpng.webp"
                              alt="ivan"
                            />
                          </div>

                          <div>
                            <p class="stock-text__sale">
                              Иван Алексеев
                            </p>

                            <p
                              class="adaptive-text__company"
                              style="opacity: 0.7;"
                            >
                              Покупатель
                            </p>
                          </div>
                        </div>
                        <div
                          class="burger-feedback adaptive-text__company"
                          data-state="collapsed"
                        >
                          <p class="">
                            В 2013 установил мульти сплит Панасоник и
                            вентиляционную установку Вентмашина. Что сразу очень
                            понравилось, так это тихая работа климатической
                            техники.
                          </p>
                          <p style="margin-top: 1vw;">
                            Долго выбирал где купить, перелопатил... В 2013
                            установил мульти сплит Панасоник и вентиляционную
                            установку Вентмашина. Что сразу очень понравилось,
                            так это тихая работа климатической техники.Долго
                            выбирал где купить, перелопатил... В 2013 установил
                            мульти сплит Панасоник и вентиляционную установку
                            Вентмашина. Что сразу очень понравилось, так это
                            тихая работа климатической техники.Долго выбирал где
                            купить, перелопатил... В 2013 установил мульти сплит
                            Панасоник и вентиляционную установку Вентмашина. Что
                            сразу очень понравилось, так это тихая работа
                            климатической техники. Долго выбирал где купить,
                            перелопатил...
                          </p>
                        </div>

                        <div class="adaptive-text__company readMore">
                          Прочитать подробнее...
                        </div>
                      </div>

                      <div class="feedback-card">
                        <div class="feedback-container__inner">
                          <div class="feedback-container__inner-img">
                            <img
                              style="width:100%; height:auto"
                              src="/imgs/webp/sveta.webp"
                              alt="sveta"
                            />
                          </div>

                          <div>
                            <p class="stock-text__sale">
                              Светлана Габуния
                            </p>

                            <p
                              class="adaptive-text__company"
                              style="opacity: 0.7;"
                            >
                              Генеральный директор «SDI MEDIA RU»
                            </p>
                          </div>
                        </div>
                        <div class="burger-feedback" data-state="collapsed">
                          <p class="adaptive-text__company">
                            Круглосуточная творческая деятельность в офисе
                            подразумевает не только наличие комфорта, но и
                            соблюдение санитарных норм. Правильная вентиляция
                            помещений и поддержка в них оптимального
                            температурного режима с помощью климатической
                            техники существенно снижает утомляемость
                            сотрудников.
                          </p>
                          <p style="margin-top: 1vw;">
                            Для нашей компании «SDI MEDIA RU» это особенно
                            актуально. Мы занимаемся дубляжом кино и
                            телевизионного продукта. Тот кто знаком с этим видом
                            деятельности, знает, что озвучка происходит в почти
                            замурованной комнате без окон, со
                            звуконепроницаемыми стенами. Содержать такие
                            помещениях пригодными для круглосуточной работы
                            актеров и звукорежиссеров можно лишь имея хорошее
                            климатическое оборудование. А для нашей специфики,
                            климатическая техника должна быть еще и с бесшумной
                            подачей воздуха, звук которой не улавливается
                            микрофонами.
                          </p>
                          <p style="margin-top: 1vw;">
                            Компания «Точка холода» сумела нам рассчитать и
                            быстро установить тихую вентиляционную систему,
                            которая подходит под все наши требования. И большая
                            им благодарность за то, что откликаются на наши
                            просьбы по первому зову. Ведь для нас срыв сроков
                            сдачи проекта означает потерять клиента.
                          </p>
                        </div>

                        <div class="adaptive-text__company readMore">
                          Прочитать подробнее...
                        </div>
                      </div>

                      <div class="feedback-card">
                        <div class="feedback-container__inner">
                          <div class="feedback-container__inner-img">
                            <img
                              style="width:100%; height:auto"
                              src="/imgs/webp/radik.webp"
                              alt="radik"
                            />
                          </div>

                          <div>
                            <p class="stock-text__sale">
                              Радмила Гаспарян
                            </p>
                            <p
                              class="adaptive-text__company"
                              style="opacity: 0.7;"
                            >
                              «ЗАО Ферреро Руссия»
                            </p>
                          </div>
                        </div>
                        <div class="burger-feedback" data-state="collapsed">
                          <p class="adaptive-text__company">
                            В новый офис нужна была хорошая и недорогая система
                            вентиляции с функцией кондиционирования воздуха.
                            Отправив ...В новый офис нужна была хорошая и
                            недорогая система вентиляции с функцией
                            кондиционирования воздуха. Отправив ...В новый офис
                            нужна была хорошая и недорогая система вентиляции с
                            функцией кондиционирования воздуха. Отправив ...В
                            новый офис нужна была хорошая и недорогая система
                            вентиляции с функцией кондиционирования воздуха.
                            Отправив ...В новый офис нужна была хорошая и
                            недорогая система вентиляции с функцией
                            кондиционирования воздуха. Отправив ...В новый офис
                            нужна была хорошая и недорогая система вентиляции с
                            функцией кондиционирования воздуха. Отправив ...
                          </p>
                        </div>

                        <div class="adaptive-text__company readMore">
                          Прочитать подробнее...
                        </div>
                      </div>

                      <div class="feedback-card">
                        <div class="feedback-container__inner">
                          <div class="feedback-container__inner-img">
                            <img
                              style="width:100%; height:auto"
                              src="/imgs/webp/litvin.webp"
                              alt="litvin"
                            />
                          </div>

                          <div>
                            <p class="stock-text__sale">
                              Литвин Николай
                            </p>
                            <p
                              class="adaptive-text__company"
                              style="opacity: 0.7;"
                            >
                              «ОТР 2000»
                            </p>
                          </div>
                        </div>
                        <div class="burger-feedback" data-state="collapsed">
                          <p class="adaptive-text__company">
                            У нас очень высокие требования к работе наших
                            серверов, т.к. это одни из основных инструментов в
                            нашем бизнесе. Нам необходима стабильная температура
                            в серверной комнате, чтобы оборудование не
                            перегревало...У нас очень высокие требования к
                            работе наших серверов, т.к. это одни из основных
                            инструментов в нашем бизнесе. Нам необходима
                            стабильная температура в серверной комнате, чтобы
                            оборудование не перегревало...У нас очень высокие
                            требования к работе наших серверов, т.к. это одни из
                            основных инструментов в нашем бизнесе. Нам
                            необходима стабильная температура в серверной
                            комнате, чтобы оборудование не перегревало...
                          </p>
                        </div>

                        <div class="adaptive-text__company readMore">
                          Прочитать подробнее...
                        </div>
                      </div>
                    </div>
                  `
                : html`
                    <div class="feedback-container">
                      <p
                        class="adaptive-text__company"
                        style="text-align: center; margin: 4vw 0;"
                      >
                        В настоящее время отзывы отсутствуют
                      </p>
                    </div>
                  `}

              <div style="margin-bottom: 4vw;" class="sertificate-grid">
                ${documents.map(
                  (doc) => html`
                    <img
                      class="zoomable sertificate-img"
                      style=""
                      title=${doc.title}
                      src=${doc.file}
                      alt="ivan"
                    />
                  `
                )}
              </div>
            </div>
          </div>
        </section>
      `,
      content
    );

    feedbackCollapse();
    initializeImageZoom();
  };

  // Первичный рендер
  renderContent();
}
