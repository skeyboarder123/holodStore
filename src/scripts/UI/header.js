window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 1) {
    header.style.background = 'rgba(255,255,255,0.9)';
  } else {
    header.style.background = 'transparent';
  }
});
