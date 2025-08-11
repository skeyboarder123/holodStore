/**
 * Страница 404 - Страница не найдена
 */

import { html, render } from '/node_modules/lit-html/lit-html.js';
import { setMetaTags } from '../hooks/metaTags.js';

// Стили для страницы 404
const notFoundStyles = `
  .not-found-container {
    display: flex;
   
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    height: 60vh;
    padding: 10% 0;
    text-align: center;
  }

  .not-found-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2vw;
    align-items: center;
    max-width: 70%;
    height: 100%;
  }

  .not-found-title {
    font-size: 10vw;
    font-weight: 700;
    line-height: 1;
    width: 100%;
    margin: 0;
    text-align: center;
    }
  
  
 

  @media (max-width: 768px) {
    .not-found-title {
      font-size: 20vw;
    }

    .not-found-content {
      max-width: 100%;
    }
  }
`;

// Шаблон страницы 404
const notFoundTemplate = () => html`
  <style>
    ${notFoundStyles}
  </style>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <h2>Страница не найдена</h2>
      <p class="adaptive-text__company ">
        Запрашиваемая страница не существует или была перемещена.
      </p>
      <a href="/" class="button-main" @click=${handleHomeClick}
        >Вернуться на главную</a
      >
    </div>
  </div>
`;

// Обработчик клика по кнопке возврата на главную
function handleHomeClick(event) {
  event.preventDefault();
  history.pushState({}, '', '/');

  // Прокрутка страницы вверх
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  // Вызов роутера для загрузки главной страницы
  window.router && window.router();
}

// Функция загрузки страницы 404
export function loadNotFound() {
  const mainContent = document.getElementById('main_content');

  // Очищаем контейнер перед рендерингом
  if (mainContent) {
    // Очистка содержимого
    mainContent.innerHTML = '';

    // Установка метатегов для страницы 404
    setMetaTags({
      title: 'Страница не найдена | 404',
      description: 'Запрашиваемая страница не существует или была перемещена.',
      keywords: 'ошибка, 404, страница не найдена',
    });

    // Рендеринг шаблона 404
    render(notFoundTemplate(), mainContent);
  }
}
