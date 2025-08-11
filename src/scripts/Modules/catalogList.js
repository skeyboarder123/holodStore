import { html } from '/node_modules/lit-html/lit-html.js';

export function getCatalogListTemplate({ catalogs, mainPage }) {
  return html`
    

        <div class="storeStockContainer">
          ${catalogs.results.map((catalog) => {
            return html`
              <div class="storeStock">
                <a href="/catalog/${catalog.slug}">
                  <div class="storeStock__inner">
                    <img
                      style="max-width: 100%; height: 75%"
                      width="640"
                      height="380"
                      src=${catalog.image}
                      alt=${catalog.name}
                    />
                    <p class="stock-text">
                      ${catalog.name}
                    </p>
                  </div>
                </a>
              </div>
            `;
          })}
        </div>

        ${!mainPage ? html`` : ''}
      </div>
    </section>
  `;
}
