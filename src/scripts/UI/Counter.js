import { html } from '/node_modules/lit-html/lit-html.js';

export const Counter = ({ value, onIncrement, onDecrement, productId }) => {
  return html`
    <style>
      .counter {
        width: 8vw;
        font-size: 1.5vw;
        padding: 1vw 1.5vw;
        height: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: center;

        border-radius: 1vw;
        border: 1px solid rgb(224, 224, 224);
        background: rgb(255, 255, 255);
        user-select: none;
      }

      .counter__button {
        font-weight: bold;
        cursor: pointer;

        transition: background-color 0.2s ease;
      }

      .counter__button:hover {
        background: rgba(224, 224, 224, 0.5);
      }

      .counter__button--left {
        border-radius: 10px 0 0 10px;
      }

      .counter__button--right {
        border-radius: 0 10px 10px 0;
      }

      .counter__value {
        font-weight: bold;
        width: 100%;
        text-align: center;
      }
    </style>

    <div class="counter" data-product-id="${productId || ''}">
      <p class="counter__button counter__button--left" @click=${onDecrement}>
        -
      </p>
      <p class="counter__value counter-value">${value}</p>
      <p class="counter__button counter__button--right" @click=${onIncrement}>
        +
      </p>
    </div>
  `;
};
