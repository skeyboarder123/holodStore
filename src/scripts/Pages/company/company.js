import { html, render } from '/node_modules/lit-html/lit-html.js';

export function loadCompany() {
  const content = document.getElementById('main_content');
  render(
    html`
      <section style="background-color: #f2f6ff" class="section-main">
        <div class="main-container">
          <h2 style="margin-bottom:2vw;">О компании</h2>

          <div style="display:flex; gap:10%; height:auto">
            <div class="bosscompany">
              <img
                style="width: 100%; height: auto;"
                src="/imgs/DIRECTORBOSS.png"
                alt=""
              />
            </div>

            <div style="width:65%" class="adaptive-text__company">
              <p style="font-weight: bold; margin-bottom: 2vw;">
                Дорогие клиенты!
              </p>

              <p>
                Я рад видеть Вас на сайте компании «ТОЧКА ХОЛОДА». С 2000 года,
                наша команда помогает создавать комфортный микроклимат в жилых
                домах, административных или производственных помещениях.
                Опираясь на свой опыт, мы прочно удерживаем высокие позиции на
                рынке климатического оборудования. Регулярно расширяем каталог
                климатической техники и сопутствующих товаров, вовремя реагируя
                на ожидания своих покупателей. Постоянно улучшаем качество
                нашего сервиса и услуг, внимательно прислушиваясь к пожеланиям
                наших дорогих клиентов. Совершенствуем свои навыки в области
                проектирования и монтажа сложных климатических систем. Мы найдём
                красивое инженерное решение для любой задачи. Просто расскажите
                нам о ней.
              </p>

              <p style="font-weight: bold; margin-top: 2vw;">
                С уважением к Вам, генеральный директор Чижов Д. В.
              </p>
            </div>
          </div>

          <div class="adaptive-text__company" style="margin-top: 4vw;">
            <p style="margin-bottom: 1.5vw;">
              &laquo;ТОЧКА ХОЛОДА&raquo;&nbsp;&mdash; это официальный дилер
              крупнейших производителей климатического оборудования: MDV (МДВ),
              Mitsubishi Electric (Митсубиши Электрик), Mitsubishi Heavy
              (Митсубиши Хеви), Hisense (Хайсенс), Ventmachine (Вентмашины),
              Turkov (Турков), GENERAL FUJITSU (Дженерал Фуджитсу), Midea
              (Мидеа), General Climate (Дженерал Климат), а&nbsp;также других
              ведущих брэндов. Авторизированный сервисный центр по&nbsp;ремонту
              и&nbsp;обслуживанию климатической техники.
            </p>
            <p style="margin-bottom: 1.5vw;">
              Мы&nbsp;гордимся, что за&nbsp;время своей успешной работы, смогли
              стать надёжным партнером для многих частных и&nbsp;корпоративных
              клиентов. Мы&nbsp;ценим Ваше доверие к&nbsp;нашей компании.
            </p>
            <p style="margin-bottom: 1.5vw;">
              Цель&nbsp;&mdash; создавать комфортный микроклимат в&nbsp;местах
              проживания или работы людей под любой бюджет.
            </p>
            <p style="margin-bottom: 1.5vw;">
              Миссия&nbsp;&mdash; улучшать условия жизни жителей Московского
              региона средствами систем кондиционирования и&nbsp;вентиляции,
              насыщая помещения свежим чистым воздухом, поддерживая в&nbsp;них
              комфортную температуру.
            </p>
            <p style="margin-bottom: 3vw;">
              Команда&nbsp;&mdash; это дружный коллектив высококлассных
              специалистов с&nbsp;большим стажем работы, которые постоянно
              повышают уровень своих знаний и&nbsp;мастерства.
            </p>
          </div>

          <div style="margin-bottom: 4vw;">
            <h2 style="margin-bottom: 4vw;">
              Ваши преимущества работы с «ТОЧКОЙ ХОЛОДА»
            </h2>

            <div class="company-grid">
              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Прозрачность цен
                </p>

                <p>
                  Вы всегда знаете, сколько и за что платите, потому что мы не
                  используем скрытых платежей. Менеджеры отдела продаж
                  озвучивают Вам окончательную стоимость товара или услуг.
                </p>
              </div>

              <div
                style="padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Работаем без предоплат
                </p>

                <p>
                  Покупатель оплачивает услуги либо заказанный товар после
                  выполнения работ или доставки.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Качество работ
                </p>

                <p>
                  Мы используем специализированное оборудование, внедряем
                  современные технологии ремонта. Монтажные и ремонтные бригады,
                  работают в соответствии с техническими требованиями,
                  эксплуатационными нормами, государственными и отраслевыми
                  стандартами (ГОСТ 12.4.021-75, ОСТ 36-134-86), а также другими
                  нормативными документами (СНиП 41-01-2003).
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Лояльность
                </p>

                <p>
                  Постоянным или крупным корпоративным клиентам предлагаем
                  особые условия сотрудничества, с персональным прайс-листом.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Клиентоориентированный подход
                </p>

                <p>
                  Поможем Вам найти поставщиков услуг или сервис для решения
                  проблемы, если задача находится не в нашей компетенции.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Гарантия
                </p>

                <p>
                  Даём официальную гарантию от 12 месяцев до 10 лет,
                  осуществляем гарантийный или постгарантийный ремонт.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Удобная оплата
                </p>

                <p>
                  Для снижения единовременной финансовой нагрузки мы
                  предусмотрели покупку в кредит или рассрочку.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Свой проектный отдел
                </p>

                <p>
                  Поможем спроектировать надёжную систему вентиляции и
                  кондиционирования воздуха с заданными параметрами. Выполним
                  расчёт характеристик оборудования и соберём оптимальный
                  комплект из ассортимента нашего интернет-магазина.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Профессионализм сотрудников
                </p>

                <p>
                  У нас опытные монтажные бригады с большим стажем работы,
                  сертифицированные инженеры и проектировщики, компетентные
                  менеджеры отдела продаж. Высокую квалификацию наших
                  сотрудников подтверждают положительные отзывы клиентов.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Собственный сервисный центр
                </p>

                <p>
                  Наш сервис центр сделает точную диагностику и выполнит
                  аккуратный ремонт кондиционера или вентиляционной установки.
                  При ремонте, мы используем оригинальные детали, что
                  значительно продлевает срок службы климатического
                  оборудования.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Свой склад с оригинальными запчастями
                </p>

                <p>
                  Наш сервисный центр держит на складе часто востребованные
                  запасные части для самых распространённых моделей
                  сплит-систем. Это существенно сокращает время ремонта.
                </p>
              </div>

              <div
                style=" padding: 0.5vw;;border-bottom:1px solid rgba(202, 202, 202, 0.45)"
                class="adaptive-text__company"
              >
                <p style="font-weight: bold; margin-bottom: 1vw;">
                  Служба доставки
                </p>

                <p>
                  Вам вовремя привезут купленное оборудование домой -
                  наша служба доставки работает как часы. Если для ремонта
                  необходим демонтаж и отправка неисправной детали в сервисный
                  центр, Вам не надо делать это самим, её демонтируют и увезут
                  наши сотрудники.
                </p>
              </div>
            </div>
          </div>

          <div style="margin-bottom: 2vw;" class="adaptive-text__company">
            <p>
              Присоединяйтесь к компании «ТОЧКА ХОЛОДА»! Ведь благодаря Вам, мы
              улучшаем наш сервис, совершенствуем технологии обслуживания и
              ремонта климатической техники, начинаем сотрудничать с новыми
              перспективными производителями.
              <span style="font-weight: bold;"
                >Давайте двигаться вместе навстречу комфорту!</span
              >
            </p>
          </div>
        </div>
      </section>
    `,
    content
  );
}
