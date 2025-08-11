document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeButton = document.querySelector(
    '.mobile-menu img[src="/svgs/close.svg"]'
  );

  function closeMenu() {
    if (hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      hamburger.classList.add('deactivating');

      setTimeout(() => {
        hamburger.classList.remove('deactivating');
      }, 100);

      mobileMenu.classList.remove('active');

      setTimeout(() => {
        mobileMenu.style.visibility = 'hidden';
      }, 300);
    }
  }

  hamburger.addEventListener('click', (event) => {
    event.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    if (mobileMenu.classList.contains('active')) {
      mobileMenu.style.visibility = 'visible';
    }
  });

  if (closeButton) {
    closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      closeMenu();
    });
  }

  document.addEventListener('click', (event) => {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger) {
      closeMenu();
    }
  });
});
