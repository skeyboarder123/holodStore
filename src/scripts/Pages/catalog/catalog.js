import { html, render } from '/node_modules/lit-html/lit-html.js';
import api from '../../../api/api.js';
import { setMetaTags } from '../../hooks/metaTags.js';
import { getCatalogListTemplate } from '../../Modules/catalogList.js';
import { getCheckGreenTemplate } from '../../UI/checkGreen.js';
import { getBreadcrumbsTemplate } from '../../utils/breadcrumbs.js';

export async function loadCatalog() {
  const content = document.getElementById('main_content');
  const catalogs = await api.getCatalogs();

  setMetaTags({
    title: catalogs.meta.title,
    description: catalogs.meta.description,
    keywords: catalogs.meta.keywords,
  });

  render(
    html`
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
          ${getBreadcrumbsTemplate()}
          <h2>Каталог товаров</h2>
          ${getCatalogListTemplate({ catalogs, mainPage: false })}
          ${getCheckGreenTemplate()}
        </div>
      </section>
    `,
    content
  );
}
