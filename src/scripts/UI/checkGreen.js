import { html } from '/node_modules/lit-html/lit-html.js';

export function getCheckGreenTemplate() {
  return html`
    <div class="zelen">
      <img class="check-green" src="/svgs/checkGreen.svg" alt="check" />
      <div>
        <p
          style="margin-bottom:3vw; line-height:1.4"
          class="adaptive-text__company"
        >
          Не&nbsp;важно в&nbsp;какой категории вы&nbsp;выбираете систему
          кондиционирования, ведь в&nbsp;интернет-магазине &laquo;Точка
          Холода&raquo; большой каталог как инверторных так
          и&nbsp;не&nbsp;инверторных моделей для любых задач, от&nbsp;таких
          популярных брендов как: Royal Clima, Hisense, Haier, IGC, Ballu, AUX,
          Electrolux. В&nbsp;нашем онлайн магазине, можно купить надёжный
          кондиционер с&nbsp;гарантией производителя и&nbsp;профессиональной
          установкой по&nbsp;низкой цене. Заказать удобную доставку
          по&nbsp;Москве и&nbsp;Московской области или получить дополнительную
          скидку в&nbsp;10% за&nbsp;самовывоз. В&nbsp;рамках сервисной программы
          нашей компании, заключить договор на&nbsp;ежегодное техническое
          обслуживание климатического оборудования.
        </p>
        <p class="adaptive-text__company">Желаем Вам приятных покупок!</p>
      </div>
    </div>
  `;
}
