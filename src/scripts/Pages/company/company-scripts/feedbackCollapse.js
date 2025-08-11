// src/company-scripts/feedbackCollapse.js
export function feedbackCollapse() {
  const readMoreButtons = document.querySelectorAll('.readMore');

  readMoreButtons.forEach((button) => {
    const feedback = button.previousElementSibling; // .burger-feedback
    const fullHeight = feedback.scrollHeight + 'px'; // Реальная высота контента

    button.addEventListener('click', () => {
      const isCollapsed = feedback.dataset.state === 'collapsed';

      if (isCollapsed) {
        feedback.style.height = fullHeight;
        feedback.dataset.state = 'expanded';
        button.textContent = 'Свернуть';
      } else {
        feedback.style.height = '8.5vw';
        feedback.dataset.state = 'collapsed';
        button.textContent = 'Прочитать подробнее...';
      }
    });
  });
}
