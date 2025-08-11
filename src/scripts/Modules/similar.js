import { html } from '/node_modules/lit-html/lit-html.js';

export function renderSimilarProducts() {
  return html`
    <h2>Похожие товары</h2>
    <div
      style="margin-top:2vw; width:60%; height:fit-content; margin:0 auto; display:flex; gap:10%; align-items:center;"
    >
      <div style="width: 45%; height:auto;">
        <div style="width: 100%; height:auto;">
          <img
            style="width:100%; height:100%; object-fit:cover;"
            class="storeStock"
            src="/imgs/condition.webp"
            alt="Похожий товар"
          />
        </div>
        <p
          style="font-weight:bold; padding: 1vw 0 1vw 0"
          class="adaptive-text__company"
        >
          Климатизатор Биокондиционер 6000SC
        </p>
        <p style="font-size:0.8vw;" class="adaptive-text__company">
          130 000.00 руб
        </p>
      </div>
      <div style="width: 45%; height:auto;">
        <div style="width: 100%; height:auto;">
          <img
            style="width:100%; height:100%; object-fit:cover"
            class="storeStock"
            src="/imgs/condition.webp"
            alt="Похожий товар"
          />
        </div>
        <p
          style="font-weight:bold; padding: 1vw 0 1vw 0"
          class="adaptive-text__company"
        >
          Климатизатор Биокондиционер 6000SC
        </p>
        <p style="font-size:0.8vw;" class="adaptive-text__company">
          130 000.00 руб
        </p>
      </div>
    </div>
  `;
}
