import api from '../../api/api.js';

export function initializeForm() {
  const overlay = document.getElementById('overlay');
  const openFormBtn = document.querySelector('.openFormBtn');
  const closeFormBtn = document.querySelector('.closeFormBtn');
  const contactForm = document.getElementById('contactForm');

  // Находим все ссылки с текстом "Обратный звонок"
  const callbackLinks = Array.from(document.querySelectorAll('a')).filter(
    (link) => link.textContent.trim() === 'Обратный звонок'
  );

  // Открытие формы заказа при клике на кнопку
  if (openFormBtn) {
    openFormBtn.addEventListener('click', () => {
      if (overlay) {
        openForm('order');
      }
    });
  }

  // Открытие формы обратного звонка при клике на соответствующие ссылки
  if (callbackLinks.length > 0) {
    callbackLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (overlay) {
          openForm('callback');
        }
      });
    });
  }

  // Закрытие формы при клике на кнопку закрытия
  if (closeFormBtn) {
    closeFormBtn.addEventListener('click', () => {
      if (overlay) {
        closeForm();
      }
    });
  }

  // Закрытие формы при клике вне её области
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeForm();
      }
    });
  }

  // Функция для открытия формы с анимацией
  function openForm(type) {
    const formTitle = overlay.querySelector('.form-container h1');
    if (formTitle) {
      formTitle.textContent =
        type === 'order' ? 'Создание заказа' : 'Обратный звонок';
    }

    // Показываем форму с анимацией
    overlay.classList.add('active');
  }

  // Функция для закрытия формы с анимацией
  function closeForm() {
    overlay.classList.remove('active');
  }

  // Обработка отправки формы
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Создаем объект с данными формы
      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        consent:
          Array.from(document.querySelectorAll('input[name="consent"]:checked'))
            .length === 2,
      };

      // Определяем тип формы по заголовку
      const formTitle = document.querySelector('.form-container h1');
      const formType =
        formTitle && formTitle.textContent.includes('заказ')
          ? 'order'
          : 'callback';

      // Отправляем запрос в API в зависимости от типа формы
      if (formType === 'callback') {
        api.sendCallbackRequest(
          formData.name,
          formData.phone,
          formData.message
        );
      }
      // Сброс формы и закрытие окна
      contactForm.reset();
      closeForm();

      // Показываем уведомление об успешной отправке
      setTimeout(() => {
        alert(
          'Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.'
        );
      }, 300); // Добавляем небольшую задержку, чтобы анимация закрытия завершилась
    });
  }
}
