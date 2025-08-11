import { html } from '/node_modules/lit-html/lit-html.js';
import { formatPrice } from '../hooks/formatPrice.js';
import { Counter } from '../UI/Counter.js';
import cartManager from '../utils/cart.js';

export const renderProductItems = (products, slug, catalogSlug, flag) => {
  function updateQuantity(id, change) {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const newQuantity = Math.max(1, products[productIndex].quantity + change);
      cartManager.updateQuantity(id, newQuantity);
      products[productIndex].quantity = newQuantity;
    }
  }

  function removeFromCart(id) {
    cartManager.removeFromCart(id);
  }

  if (!products || products.length === 0) {
    return html`
      <h3 class="">Товары не найдены</h3>
    `;
  }

  return products.map(
    (product) => html`
      <div class="subcatalogStockCard">
        <div class="subcatalog-container-wrapper__inner">
          <div class="subcatalog-card-img">
            <img
              src="${product.image || '/imgs/conditionWhiteMedium.png'}"
              alt="${product.name}"
              style="width: 100%; height: 100%; inset:0; "
            />
          </div>

          <div class="subcatalog-card-info">
            <p class="stock-text__sale">
              ${product.name}
            </p>
            <p class="adaptive-text__company" style="opacity:0.5">
              Артикул: ${product.article || 'Н/Д'}
            </p>
            <p class="adaptive-text__company" style="opacity:0.5">
              Категория: ${product.category || 'Н/Д'}
            </p>

            <p style="opacity:1" class="stock-text__sale">
              ${product.price ? formatPrice(product.price) : 'По запросу'}
            </p>

            ${flag
              ? html`
                  <button class="button-grey">
                    <a
                      href="/catalog/${catalogSlug || ''}/${slug ||
                        ''}/${product.slug || 'product'}"
                      >Купить</a
                    >
                  </button>
                `
              : html`
                  <div class="bucket-counter">
                    ${Counter({
                      value: product.quantity,
                      onIncrement: () => updateQuantity(product.id, 1),
                      onDecrement: () => updateQuantity(product.id, -1),
                      productId: product.id,
                    })}
                    <p
                      style="font-weight: bold; width: fit-content;"
                      class="stock-text__sale"
                    >
                      ${formatPrice(product.price * product.quantity)}
                    </p>

                    <div
                      class="removeSvg"
                      @click=${() => removeFromCart(product.id)}
                      @mouseover=${(e) =>
                        (e.currentTarget.style.backgroundColor = '#ffe6e6')}
                      @mouseout=${(e) =>
                        (e.currentTarget.style.backgroundColor = '#fff')}
                    >
                      <img
                        width="100%"
                        height="100%"
                        class="removeSvg"
                        src="/svgs/remove.svg"
                        alt="Удалить"
                      />
                    </div>
                  </div>
                `}
          </div>
        </div>
      </div>
    `
  );
};
