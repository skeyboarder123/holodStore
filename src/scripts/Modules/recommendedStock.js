import { html } from '/node_modules/lit-html/lit-html.js';
import { initializeRecommendedSlider } from '../UI/recommendedSlider.js';
import { formatPrice } from '../hooks/formatPrice.js';

export function getRecommendedStockTemplate(props) {
  setTimeout(() => {
    initializeRecommendedSlider();
  }, 0);

  return html`
    <div class="recommended-slider">
      <div class="recommended-slider-track">
        ${props.recommendedStock.map(
          (item) => html`
            <div class="storeRecStockContainer">
              <div class="storeRecStockContainer__inner">
                <img
                  style="width: 100%;  height: 100%; object-fit:contain; inset:0;"
                  width="640"
                  height="380"
                  src=${item.image}
                  alt=${item.name}
                />
              </div>

              <div class="stock-text-wrapper">
                <p
                  class="stock-text__sale"
                  style="
                        
                        word-break: break-word;
                        overflow-wrap: break-word;
                        
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        margin-bottom: 1vw;
                      "
                >
                  ${item.name.length > 35
                    ? item.name.slice(0, 35) + '...'
                    : item.name}
                </p>

                <div>
                  <p
                    class="stock-text"
                    style="color: #ff4545; font-weight: bold;text-align: left;"
                  >
                    ${formatPrice(item.price)}
                  </p>

                  ${item.old_price &&
                    html`
                      <p
                        class="stock-text"
                        style="text-decoration: line-through; color: gray; font-weight: bold;text-align: left;"
                      >
                        ${formatPrice(item.old_price)}
                      </p>
                    `}
                </div>

                <a
                  class="button-grey adaptive-text__company"
                  href=${`/catalog/${item.catalog_slug}/${item.subcatalog_slug}/${item.slug}`}
                  >Купить</a
                >
              </div>
            </div>
          `
        )}
      </div>
      <button class="recommended-slider-btn prev">❮</button>
      <button class="recommended-slider-btn next">❯</button>
    </div>
  `;
}
