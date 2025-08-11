import { initializeForm } from '../UI/form.js';
import { html, render } from '/node_modules/lit-html/lit-html.js';
import { unsafeHTML } from '/node_modules/lit-html/directives/unsafe-html.js';
import cartManager from '../utils/cart.js';
import api from '../../api/api.js';
import { Counter } from '../UI/Counter.js';
import { setMetaTags } from '../hooks/metaTags.js';
import { getCheckGreenTemplate } from '../UI/checkGreen.js';
import { renderSimilarProducts } from '../Modules/similar.js';
import { getBreadcrumbsTemplate } from '../utils/breadcrumbs.js';
export async function loadProduct({ product }) {
  let quantities = 1;
  let open = true;
  let selectedImageId = null;

  try {
    console.log('Product data:', product);
    console.log('Additional images:', product.additional_images);

    function formatPrice(price) {
      if (!price) return '0.00 руб.';
      return (
        price.toLocaleString('ru-RU', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + ' руб.'
      );
    }

    function updateQuantity(change) {
      quantities = Math.max(1, quantities + change);
      renderContent();
    }

    function addToCartHandler() {
      if (!product) return;
      cartManager.addToCart(product, quantities);
    }

    const handleImageClick = (index) => {
      console.log('Image clicked:', index);
      selectedImageId = index;
      const overlay = document.getElementById('overlay');
      if (overlay) {
        const overlayImage = overlay.querySelector('img');
        if (overlayImage) {
          overlayImage.src = product.additional_images[index];
        }
        overlay.style.display = 'flex';
        requestAnimationFrame(() => {
          overlay.style.opacity = '1';
          overlay.style.visibility = 'visible';
          const container = overlay.querySelector('.form-container');
          if (container) {
            container.style.transform = 'scale(1)';
            container.style.opacity = '1';
          }
        });
      }
    };

    const handleCloseOverlay = () => {
      const overlay = document.getElementById('overlay');
      if (overlay) {
        const container = overlay.querySelector('.form-container');
        if (container) {
          container.style.transform = 'scale(0.95)';
          container.style.opacity = '0';
        }
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';

        setTimeout(() => {
          overlay.style.display = 'none';
          selectedImageId = null;
        }, 300);
      }
    };

    const handleDescriptionClick = () => {
      open = true;
      renderContent();
    };

    const handleDetailsClick = () => {
      open = false;
      renderContent();
    };

    setMetaTags({
      title: product.meta.title,
      description: product.meta.description,
      keywords: product.meta.keywords,
    });

    const renderContent = () => {
      if (!product) return;

      const content = document.getElementById('main_content');
      if (!content) return;

      console.log('Rendering with selectedImageId:', selectedImageId);

      const selectedImage = product.additional_images[selectedImageId];

      console.log('Selected image for overlay:', selectedImage);

      const detailsContent = open
        ? html`
            <div style="list-style:disc;">
              ${unsafeHTML(product.product_description || '')}
            </div>
          `
        : html`
            <div style="display:block;">
              <ul style="width:100%;">
                ${Object.keys(product.details).map(
                  (detail) =>
                    html`
                      <div
                        style="display:flex; width:100%; height:100%; justify-content:space-between; align-items:center; margin-bottom:1vw;padding:1vw 0; border-bottom:1px solid rgb(224, 224, 224);"
                      >
                        <li style="list-style:none; font-weight:bold; ">
                          ${detail}
                        </li>
                        <li style="list-style:none; font-weight:bold;">
                          ${product.details[detail]}
                        </li>
                      </div>
                    `
                )}
              </ul>
            </div>
          `;

      render(
        html`
          <style>
            #kart .kart-descr li {
              list-style-type: disc;
              margin-left: 1vw;
            }
            #kart ul {
              margin-bottom: 1vw;
            }
          </style>

          <section
            id="kart"
            style="background-color: #fff"
            class="section-main"
          >
            <div class="main-container">
              ${getBreadcrumbsTemplate()}
              <h2>${product.name}</h2>
              <div class="product-gallery">
                <div class="gallery-main-container">
                  <div class="gallery">
                    <div class="gallery-container">
                      ${product.additional_images.map(
                        (img, index) => html`
                          <div class="gallery-item">
                            <img
                              src="${img}"
                              alt="Product image ${index + 1}"
                              class="openFormBtn"
                              style="width:100%; height:100%; object-fit:contain; object-position: center;"
                              @click=${() => handleImageClick(index)}
                            />
                          </div>
                        `
                      )}
                    </div>
                  </div>
                </div>
                <div class="storeStock product-image" style="">
                  <img
                    style="width:100%; height:100%; object-fit:contain;
  );"
                    src=${product.image}
                    alt="Product"
                  />
                </div>
                <div class="product-description">
                  <p style="margin-bottom:2vw" class="adaptive-text__company">
                    ${product.header_description}
                    <a style="color:blue; cursor:pointer;" href="#description">
                      подробнее</a
                    >
                  </p>

                  <p
                    style="margin-bottom:1vw; font-weight:600;"
                    class="adaptive-text__company"
                  >
                    Артикул: ${product.article}
                  </p>

                  <p
                    style="margin-bottom:2vw; font-weight:600;"
                    class="adaptive-text__company"
                  >
                    Категория: Климатизаторы
                  </p>

                  <div
                    style="display:flex; gap:10%; justify-content:space-between;margin-bottom:2vw"
                  >
                    <div>
                      ${product.old_price
                        ? html`
                            <h2
                              style="text-decoration: line-through; color: rgba(216, 88, 88, 0.9); margin-bottom:1vw;"
                            >
                              ${formatPrice(product.old_price)}
                            </h2>
                          `
                        : ''}
                      <h2 style="margin-bottom:1vw;">
                        ${formatPrice(product.price)}
                      </h2>
                      <p
                        style="text-decoration:underline"
                        class="adaptive-text__company"
                      >
                        ${product.in_stock ? 'В наличии' : 'Нет в наличии'}
                      </p>
                    </div>
                  </div>

                  <div style="display:flex; gap:0.5vw">
                    ${Counter({
                      value: quantities,
                      onIncrement: () => updateQuantity(1),
                      onDecrement: () => updateQuantity(-1),
                    })}
                    <button class="button-primary" @click=${addToCartHandler}>
                      В корзину
                    </button>
                    <button class="button-primary" @click=${addToCartHandler}>
                      <a href="/bucket">Купить</a>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              style="width:fit-content; margin: 0 auto; display:flex; gap:1vw;"
              class="adaptive-text__company"
              id="description"
            >
              <p
                style="margin-right:1.5vw; cursor:pointer; ${open
                  ? 'font-weight:bold; padding-bottom: 0.2vw; border-bottom:0.1vw solid rgba(0, 0, 0, 0.4);'
                  : ''}"
                @click=${handleDescriptionClick}
              >
                Описание
              </p>
              <p
                style="cursor:pointer;${!open
                  ? 'font-weight:bold; padding-bottom: 0.2vw; border-bottom:0.1vw solid rgba(0, 0, 0, 0.4);'
                  : ''}"
                @click=${handleDetailsClick}
              >
                Детали
              </p>
            </div>

            <div
              class="adaptive-text__company kart-descr"
              style="list-style:disc;"
            >
              ${detailsContent}
            </div>

            <div class="main-container">
              <!--${renderSimilarProducts()}-->
              ${getCheckGreenTemplate()}
            </div>
          </section>

          <div
            id="overlay"
            class="overlay adaptive-text__company"
            style="display: none; opacity: 0; visibility: hidden;"
          >
            <div
              class="form-container"
              style="width: 80%; max-width: 1200px; background: white; padding: 20px; border-radius: 8px; position: relative;"
            >
              <img
                style="width: 100%; height: auto; object-fit: contain; max-height: 80vh;"
                src=${product.image}
                alt="Product"
              />
              <button
                class="closeFormBtn"
                style="position: absolute; top: 10px; right: 10px; background: rgba(0, 0, 0, 0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
                @click=${handleCloseOverlay}
              >
                ×
              </button>
            </div>
          </div>
        `,
        content
      );
    };

    renderContent();
    initializeForm();
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}
