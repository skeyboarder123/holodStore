import { html, render } from '/node_modules/lit-html/lit-html.js';
import api from '../../../api/api.js';
import { getServicesNavTemplate } from '../../Modules/servicesNav.js';
import { getRecommendedStockTemplate } from '../../Modules/recommendedStock.js';

export async function loadServices() {
  const content = document.getElementById('main_content');
  const articles = await api.getArticles();
  const recommendedStock = await api.getRecommendedStock();
  console.log(articles.results[0].content);
  render(
    html`
      <main style="background-color: #fff" class="section-main">
        <div style="border-bottom: 1px solid #e0e0e0;">
          <div class="main-container">
            <section style="display: flex; justify-content: space-between;">
              <div style="width: 100%;">
                <h2 style="margin-bottom:2vw;">
                  Монтаж и обслуживание климатического оборудования в Москве
                </h2>

                <div
                  class="zelen"
                  style="margin:0; width:95%; margin-bottom: 2vw;"
                >
                  <img
                    class="check-green"
                    src="svgs/checkGreen.svg"
                    alt="check"
                  />
                  <div>
                    <p style="line-height:1.4" class="adaptive-text__company">
                      Компания «Точка Холода» более 20 лет занимается
                      профессиональной установкой климатического оборудования в
                      Москве и Московской области. В нашем коллективе работают
                      опытные инженеры и монтажники, чья компетенция,
                      подтверждена успешно выполненными проектами по установке
                      сложной климатической техники в жилые и промышленные
                      здания.
                    </p>
                  </div>
                </div>

                <p style="margin-bottom: 2vw;" class="adaptive-text__company">
                  Мы уделяем пристальное внимание качеству устанавливаемых
                  комплектующих и расходных материалов, в приоритете надёжность
                  детали, а только потом идёт её цена. Завершив монтаж
                  климатического оборудования, обязательно выполняем диагностику
                  всех установленных компонентов, проводим полный цикл
                  пусконаладочных работ.
                </p>

                <div
                  class="zelen"
                  style="margin:0; width:95%; margin-bottom: 2vw;"
                >
                  <img class="check-green" src="svgs/like.svg" alt="check" />
                  <div>
                    <p style="line-height:1.4" class="adaptive-text__company">
                      Компания «Точка Холода» более 20 лет занимается
                      профессиональной установкой климатического оборудования в
                      Москве и Московской области. В нашем коллективе работают
                      опытные инженеры и монтажники, чья компетенция,
                      подтверждена успешно выполненными проектами по установке
                      сложной климатической техники в жилые и промышленные
                      здания.
                    </p>
                  </div>
                </div>

                <p style="margin-bottom: 2vw;" class="adaptive-text__company">
                  Наш авторизованный сервисный центр готов выполнить
                  качественный ремонт климатической техники. Согласно регламенту
                  установленного заводом изготовителем, провести
                  плановое сервисное обслуживание систем вентиляции и
                  кондиционирования. На все виды работ даётся гарантия от
                  официального дилера.
                </p>
              </div>
            </section>

            ${getRecommendedStockTemplate({ recommendedStock })}
          </div>
        </div>
        <section
          style="padding-top: 4vw; padding-bottom: 4vw; background: #f2f6ff"
        >
          ${getServicesNavTemplate({ articles })}

          <div class="catalog-nav" style="margin-bottom: 4vw;">
            <nav>
              <ul style="width: fit-content;margin: 0 auto;">
                <li class="adaptive-text__company catalog-nav-item">1</li>
                <li class="adaptive-text__company catalog-nav-item">2</li>
                <li class="adaptive-text__company catalog-nav-item">3</li>
                <li class="adaptive-text__company catalog-nav-item">4</li>
                <li class="adaptive-text__company catalog-nav-item">5</li>
                <li>
                  <img
                    style="cursor:pointer"
                    src="/svgs/arrow-left-nav.svg"
                    alt="arrow"
                  />
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </main>
    `,
    content
  );
}
