import { html } from '/node_modules/lit-html/lit-html.js';

export function getServicesNavTemplate({ articles }) {
  return html`
    <div class="main-container">
      <h2>Наши услуги</h2>
      <div class="storeServicesContainer">
        ${articles.results.slice(0, 6).map(
          (article) => html`
            <a href="/services/${article.slug}">
              <div class="storeServices">
                <h3 class="storeServicesText">${article.name}</h3>

                <div class="storeServicesImgContainer">
                  <img
                    class="storeServicesImg"
                    width="640"
                    height="380"
                    src=${article.image}
                    alt=${article.name}
                  />
                </div>
              </div>
            </a>
          `
        )}
      </div>
    </div>
  `;
}
