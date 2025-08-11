import { html, render } from '/node_modules/lit-html/lit-html.js';
import { unsafeHTML } from '/node_modules/lit-html/directives/unsafe-html.js';
import { setMetaTags } from '../../../hooks/metaTags.js';

const styles = `
  .section-main {
    background-color: #f2f6ff;
    min-height: 100vh;
  }

  .main-container {
    max-width: 90vw;
    margin: 0 auto;
    padding: 2vw 1vw;
  }

  .h1 {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-size: 3vw;
    margin-bottom: 2vw;
  }

  .services-img-container {
    width: 80%;
    margin: 0 auto;
    height: 25vw;
    position: relative;
    margin-bottom: 2vw;
    border-radius: 0.6vw;
    overflow: hidden;
    box-shadow: 0 0.2vw 1vw rgba(0, 0, 0, 0.1);
  }

  span, #services-content {
    display: flex;
    gap:1vw;
    flex-wrap: wrap;
  }

  .services-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .services-img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f2f6ff;
    opacity: 0.3;
    z-index: 1;
    transition: opacity 0.3s ease;
  }

  .services-content-box-1 {
    position: absolute;
    bottom: 10%;
    left: 5%;
    width: fit-content;
    padding: 1vw;
    background-color: rgba(26, 54, 93, 0.8);
    color: white;
    border-radius: 0.4vw;
    z-index: 2;
    box-shadow: 0 0.2vw 0.75vw rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(0.25vw);
  }

  .services-content-box-2 {
    position: absolute;
    bottom: 30%;
    left: 5%;
    width: fit-content;
    padding: 1vw;
    background-color: rgba(255, 255, 255, 0.8);
    color: #1a365d;
    border-radius: 0.4vw;
    z-index: 2;
    box-shadow: 0 0.2vw 0.75vw rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(0.25vw);
  }

  .adaptive-text__company1, .main-container #services-content{
    font-size: 1vw;
    line-height: 1.4;
    letter-spacing: 0.05vw;
    margin: 0;
    transition: font-size 0.3s ease;
    display: inline-block;
    
  }
    
  .adaptive-text__company1, .main-container, #services-content  {
    display: flex;
    flex-wrap: wrap;
  }

  .services-img-container:hover .services-img {
    transform: scale(1.05);
  }

  .services-img-container:hover .services-img-overlay {
    opacity: 0.2;
  }

  .main-container #services-content {
    width: 68vw;
    margin: 0 auto;
    padding: 2vw;
    background: white;
    border-radius: 0.6vw;
    box-shadow: 0 0.2vw 1vw rgba(0, 0, 0, 0.05);
    line-height: 1.8;
    color: #333;
  }

  .main-container #services-content p {
    margin-bottom: 1.25vw;
  }

  .main-container #services-content strong {
    color: #1a365d;
    font-weight: 600;
  }

  .main-container #services-content h2 {
    color: #1a365d;
    margin: 2vw 0 1.25vw;
    font-size: 2.4vw;
    font-weight: 700;
    position: relative;
    padding-bottom: 0.5vw;
  }

  .main-container #services-content h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 3vw;
    height: 0.15vw;
    background-color: #1a365d;
  }

  .main-container #services-content h3 {
    color: #1a365d;
    margin: 1.75vw 0 1vw;
    font-size: 2vw;
    font-weight: 600;
    padding: 0 !important; 
  }

  .main-container #services-content ul {
    margin-bottom: 1.25vw;
    padding-left: 1.25vw;
  }

  .main-container #services-content li {
    margin-bottom: 0.6vw;
    position: relative;
    padding-left: 1.25vw;
  }

  .main-container #services-content li::before {
    content: '•';
    color: #1a365d;
    position: absolute;
    left: 0;
    font-size: 1.2em;
  }

  .main-container #services-content table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 1.5vw 0;
    border-radius: 0.4vw;
    overflow: hidden;
    box-shadow: 0 0.1vw 0.5vw rgba(0, 0, 0, 0.05);
  }

  .main-container #services-content table th,
  .main-container #services-content table td {
    border: 0.05vw solid #e2e8f0;
    padding: 0.75vw;
    text-align: left;
    font-size: 1.2vw;
  }

  .main-container #services-content table th {
    background-color: #1a365d;
    color: white;
    font-weight: 600;
  }

  .main-container #services-content table tr:nth-child(even) {
    background-color: #f8fafc;
  }

  .main-container #services-content img {
    max-width: 100%;
    height: auto !important;
    width: auto !important;
    max-height: 15vw;
    margin: 1vw 0;
    border-radius: 0.4vw;
    box-shadow: 0 0.2vw 0.75vw rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .main-container #services-content img:hover {
    transform: scale(1.02);
  }

  .main-container #services-content em {
    color: #4a5568;
    font-style: italic;
  }
  
  /* Стили для адаптивных изображений */
  .main-container #services-content img.adaptive-image {
    max-width: 100%;
    height: auto !important;
    width: auto !important;
    display: block;
  }
  
  /* Стили для адаптивных таблиц */
  .main-container #services-content table.responsive-table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }
  
  .main-container #services-content blockquote {
    background-color: #f8f9fa;
    border-left: 0.3vw solid #1a365d;
    padding: 1vw 1.5vw;
    margin: 1.5vw 0;
    border-radius: 0.4vw;
  }
    
  @media (max-width: 1024px) {
    .main-container #services-content h3{
      font-size: 2vw;
    }
    .main-container #services-content img {
      max-height: 50vw;
    }

    .adaptive-text__company1, .main-container #services-content span.adaptive-text__company1 {
      font-size: 2vw;
    }

    
    .main-container #services-content blockquote {
      padding: 2vw;
    }

    .main-container #services-content h2 {
      font-size: 3vw;
    }

    .main-container #services-content table th,
    .main-container #services-content table td {
      font-size: 2vw;
      padding: 1vw;
    }
  }

  @media (max-width: 768px) {
    .h1 {
      font-size: 4vw;
    }

    .services-img-container {
      height: 40vw;
    }

    .services-content-box-1,
    .services-content-box-2 {
      width: fit-content;
      padding: 1.5vw;
      font-size: 2.5vw;
    }

    .services-content-box-1 {
      bottom: 5%;
      left: 5%;
    }

    .services-content-box-2 {
      bottom: 25%;
      left: 5%;
    }

    .adaptive-text__company1, .main-container #services-content span.adaptive-text__company1 {
      font-size: 2.5vw;
    }

    .main-container #services-content {
      padding: 3vw;
    }
    
    .main-container #services-content table th,
    .main-container #services-content table td {
      font-size: 2.2vw;
      padding: 1.5vw;
    }
    
    .main-container #services-content h2 {
      font-size: 3.2vw;
    }
    
    .main-container #services-content h3 {
      font-size: 2.8vw;
    }
    
    .main-container #services-content blockquote {
      padding: 2.5vw;
      margin: 3vw 0;
    }
  }
  
  @media (max-width: 480px) {
    .h1 {
      font-size: 5.5vw;
    }
    
    .adaptive-text__company1, .main-container #services-content span.adaptive-text__company1 {
      font-size: 3.5vw;
    }
    
    .main-container #services-content h2 {
      font-size: 4.5vw;
    }
    
    .main-container #services-content h3 {
      font-size: 4vw;
    }
    
    .main-container #services-content table th,
    .main-container #services-content table td {
      font-size: 3vw;
    }
  }
`;

// Функция для добавления класса ко всем параграфам в HTML
function addAdaptiveClassToParagraphs(html) {
  // Заменяем все <p> на <p class="adaptive-text__company1">
  let result = html.replace(
    /<p(?![^>]*class=["'][^"']*adaptive-text__company1[^"']*["'])/g,
    '<p class="adaptive-text__company1"'
  );

  // Обрабатываем случай, когда текст находится непосредственно в <li> без обертки <p>
  result = result.replace(
    /(<li>)(?!\s*<p)(.*?)(<\/li>)/g,
    '$1<span class="adaptive-text__company1">$2</span>$3'
  );

  // Обрабатываем текст в blockquote без обертки <p>
  result = result.replace(
    /(<blockquote>)(?!\s*<(?:p|ol|ul|span))(.*?)(<\/blockquote>)/g,
    '$1<span class="adaptive-text__company1">$2</span>$3'
  );

  return result;
}

// Функция для преобразования изображений с фиксированными размерами в адаптивные
function makeImagesAdaptive(html) {
  // Удаляем атрибуты стиля с фиксированными размерами
  let result = html.replace(
    /style=["'](?:height|width):\s*\d+px;?\s*(?:height|width):\s*\d+px;?["']/g,
    'class="adaptive-image"'
  );

  // Обрабатываем другие возможные форматы стилей с фиксированными размерами
  result = result.replace(
    /style=["']width:\s*\d+px;?\s*["']/g,
    'class="adaptive-image"'
  );

  result = result.replace(
    /style=["']height:\s*\d+px;?\s*["']/g,
    'class="adaptive-image"'
  );

  // Добавляем класс adaptive-image ко всем изображениям без класса
  result = result.replace(
    /<img(?![^>]*class=["'][^"']*adaptive-image[^"']*["'])/g,
    '<img class="adaptive-image"'
  );

  return result;
}

// Функция для адаптации таблиц
function makeTablesAdaptive(html) {
  // Добавляем класс responsive-table к таблицам без этого класса
  return html.replace(
    /<table(?![^>]*class=["'][^"']*responsive-table[^"']*["'])/g,
    '<table class="responsive-table"'
  );
}

// Функция для адаптации всего контента
function makeContentAdaptive(html) {
  let result = addAdaptiveClassToParagraphs(html);
  result = makeImagesAdaptive(result);
  result = makeTablesAdaptive(result);
  return result;
}

export function loadServicesSlug(api) {
  const content = document.getElementById('main_content');

  //   const backup = api.getArticles();
  setMetaTags(api.meta.title, api.meta.description, api.meta.keywords);
  console.log(api);

  // Применяем преобразования к контенту
  const adaptiveContent = makeContentAdaptive(api.content);

  render(
    html`
      <style>
        ${styles}
      </style>
      <section class="section-main">
        <div class="main-container">
          <h1 class="h1">${api.h1}</h1>

          <div class="services-img-container">
            <div>
              <img class="services-img" src="${api.image}" alt="${api.h1}" />
              <div class="services-img-overlay"></div>
              <div class="services-content-box-1">
                <h3>${api.page_title}</h3>
              </div>
              <div class="services-content-box-2">
                <p class="adaptive-text__company1" style="font-weight: bold;">
                  Просмотры: 156
                </p>
              </div>
            </div>
          </div>

          <div id="services-content">
            ${unsafeHTML(adaptiveContent)}
          </div>
        </div>
      </section>
    `,
    content
  );
}
