document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((dropdown) => {
    const dropbtn = dropdown.querySelector('.dropbtn');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropbtn.addEventListener('mouseenter', () => {
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('active');
        }
      });

      dropdown.classList.add('active');
    });

    dropdown.addEventListener('mouseleave', () => {
      dropdown.classList.remove('active');
    });

    const subDropdowns = dropdown.querySelectorAll('.sub-dropdown');
    subDropdowns.forEach((subDropdown) => {
      const subDropdownLink = subDropdown.querySelector('a');
      const subDropdownContent = subDropdown.querySelector(
        '.sub-dropdown-content'
      );

      subDropdownLink.addEventListener('mouseenter', () => {
        subDropdowns.forEach((otherSubDropdown) => {
          if (otherSubDropdown !== subDropdown) {
            otherSubDropdown.classList.remove('active');
          }
        });

        subDropdown.classList.add('active');
      });

      subDropdown.addEventListener('mouseleave', () => {
        subDropdown.classList.remove('active');
      });
    });
  });
});
