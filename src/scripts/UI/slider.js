export function initializeSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return; // Если слайдера нет, выходим из функции

  const track = document.querySelector('.slider-track');
  // const prevButton = document.querySelector('.slider-btn.prev');
  // const nextButton = document.querySelector('.slider-btn.next');
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.classList.add('slider-indicators');
  slider.appendChild(indicatorsContainer);

  let currentIndex = 0;
  let autoScrollInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;

  const slides = Array.from(track.children);
  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === currentIndex) indicator.classList.add('active');
    indicatorsContainer.appendChild(indicator);

    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
      resetAutoScroll();
    });
  });

  const updateSlider = () => {
    const slideWidth = slider.offsetWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateIndicators();
  };

  const updateIndicators = () => {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  };

  const nextSlide = () => {
    if (currentIndex === slides.length - 1) {
      track.style.transition = 'transform 0.5s ease';
      currentIndex = 0;
      updateSlider();

      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
      }, 500);
    } else {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      track.style.transition = 'transform 0.5s ease';
      currentIndex = slides.length - 1;
      updateSlider();

      setTimeout(() => {
        track.style.transition = 'transform 0.5s ease';
      }, 500);
    } else {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }
  };

  const startAutoScroll = () => {
    autoScrollInterval = setInterval(nextSlide, 3000);
  };

  const resetAutoScroll = () => {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  };

  // Обработчики свайпов
  track.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.touches[0].clientX;
      isSwiping = true;
      clearInterval(autoScrollInterval);
      track.style.transition = 'none';
    },
    { passive: true }
  );

  track.addEventListener(
    'touchmove',
    (e) => {
      if (!isSwiping) return;

      touchEndX = e.touches[0].clientX;
      const diff = touchStartX - touchEndX;
      const slideWidth = slider.offsetWidth;

      // Ограничиваем смещение при свайпе
      const maxOffset = slideWidth * (slides.length - 1);
      const currentOffset = currentIndex * slideWidth + diff;

      if (currentOffset >= 0 && currentOffset <= maxOffset) {
        track.style.transform = `translateX(-${currentOffset}px)`;
      }
    },
    { passive: true }
  );

  track.addEventListener('touchend', () => {
    if (!isSwiping) return;

    isSwiping = false;
    track.style.transition = 'transform 0.5s ease';

    const diff = touchStartX - touchEndX;
    const threshold = slider.offsetWidth * 0.2; // 20% ширины слайда для свайпа

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      // Возвращаем слайд на место, если свайп был недостаточным
      updateSlider();
    }

    startAutoScroll();
  });

  track.addEventListener('touchcancel', () => {
    if (!isSwiping) return;

    isSwiping = false;
    track.style.transition = 'transform 0.5s ease';
    updateSlider();
    startAutoScroll();
  });

  // nextButton.addEventListener('click', () => {
  //   nextSlide();
  //   resetAutoScroll();
  // });

  // prevButton.addEventListener('click', () => {
  //   prevSlide();
  //   resetAutoScroll();
  // });

  track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  track.addEventListener('mouseleave', startAutoScroll);

  window.addEventListener('resize', updateSlider);

  updateSlider();
  startAutoScroll();
}
