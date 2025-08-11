// src/company-scripts/imageZoom.js
export function initializeImageZoom() {
  const images = document.querySelectorAll('.zoomable');
  let modal = null;

  // Создаём модальное окно один раз
  function createModal() {
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('feedback-modal');
    modalDiv.innerHTML = `
        <div class="feedback-modal-content">
          <img src="" alt="Zoomed image">
          <button class="feedback-close-btn">×</button>
        </div>
      `;
    document.body.appendChild(modalDiv);
    return modalDiv;
  }

  images.forEach((image) => {
    image.addEventListener('click', () => {
      if (!modal) {
        modal = createModal();
      }

      const modalImg = modal.querySelector('img');
      modalImg.src = image.src; // Устанавливаем src увеличенного изображения
      modal.style.display = 'flex';
      modal.classList.remove('feedback-fade-out'); // Убираем fade-out, если был
      modal.classList.add('feedback-fade-in'); // Добавляем fade-in

      // Закрытие по клику на фон или кнопку
      modal.addEventListener(
        'click',
        (e) => {
          if (
            e.target === modal ||
            e.target.classList.contains('feedback-close-btn')
          ) {
            modal.classList.remove('feedback-fade-in');
            modal.classList.add('feedback-fade-out');
            setTimeout(() => {
              modal.style.display = 'none';
              modal.classList.remove('feedback-fade-out'); // Убираем класс после завершения
            }, 300); // Задержка соответствует длительности анимации
          }
        },
        { once: true }
      ); // Слушатель срабатывает только один раз
    });
  });
}
