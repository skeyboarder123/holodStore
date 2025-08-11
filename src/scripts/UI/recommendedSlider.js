export function initializeRecommendedSlider() {
  const slider = document.querySelector('.recommended-slider');
  if (!slider) return;

  const track = document.querySelector('.recommended-slider-track');
  const prevButton = document.querySelector('.recommended-slider-btn.prev');
  const nextButton = document.querySelector('.recommended-slider-btn.next');

  if (!track || !prevButton || !nextButton) return;

  // Стили для контейнера слайдера

  // Стили для кнопок
  const buttonStyles = {};

  Object.assign(prevButton.style, buttonStyles);
  Object.assign(nextButton.style, buttonStyles);
  prevButton.style.left = '10px';
  nextButton.style.right = '10px';

  // Стили для трека
  track.style.transition = 'transform 0.5s ease';

  let currentIndex = 0;
  let autoScrollInterval;

  const slides = Array.from(track.children); // Показываем 4 товара на странице
  const totalPages = slides.length;

  const updateSlider = () => {
    const offset = currentIndex * 100;
    track.style.transform = `translateX(-${offset}%)`;
  };

  const nextSlide = () => {
    if (currentIndex === totalPages - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlider();
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      currentIndex = totalPages - 1;
    } else {
      currentIndex--;
    }
    updateSlider();
  };

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(nextSlide, 5000);
  };

  const resetAutoScroll = () => {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  };

  nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoScroll();
  });

  prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoScroll();
  });

  track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  track.addEventListener('mouseleave', startAutoScroll);

  // Обновляем слайдер при изменении размера окна
  window.addEventListener('resize', () => {
    updateSlider();
  });

  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;
  let startTranslate = 0;
  let currentTranslate = 0;

  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
    isDragging = true;
    startTranslate = -currentIndex * 100;
    currentTranslate = startTranslate;

    // Устанавливаем немедленный ответ без задержки анимации
    track.style.transition = 'none';

    clearInterval(autoScrollInterval);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;

    touchEndX = event.touches[0].clientX;
    const diff = touchEndX - touchStartX;

    // Преобразуем разницу в пикселях в проценты (относительно ширины слайдера)
    const sliderWidth = slider.offsetWidth;
    const diffPercent = (diff / sliderWidth) * 100;

    // Ограничиваем передвижение границами слайдов
    currentTranslate = Math.max(
      -((totalPages - 1) * 100),
      Math.min(0, startTranslate + diffPercent)
    );

    // Применяем transform к треку для визуальной обратной связи
    track.style.transform = `translateX(${currentTranslate}%)`;

    // Предотвращаем прокрутку страницы при свайпе
    event.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    isDragging = false;
    // Возвращаем анимацию перехода
    track.style.transition = 'transform 0.5s ease';

    const swipeThreshold = 20; // Более низкий порог для более чувствительного свайпа (в процентах)
    const diffPercent = currentTranslate - startTranslate;

    if (Math.abs(diffPercent) > swipeThreshold) {
      if (diffPercent > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      // Если свайп недостаточно сильный, возвращаемся к текущему слайду
      updateSlider();
    }

    startAutoScroll();
  };

  // Обработка события touchcancel (прерывание свайпа)
  const handleTouchCancel = () => {
    if (!isDragging) return;

    isDragging = false;
    track.style.transition = 'transform 0.5s ease';
    updateSlider();
    startAutoScroll();
  };

  track.addEventListener('touchstart', handleTouchStart, { passive: false });
  track.addEventListener('touchmove', handleTouchMove, { passive: false });
  track.addEventListener('touchend', handleTouchEnd);
  track.addEventListener('touchcancel', handleTouchCancel);

  updateSlider();
  startAutoScroll();
}
