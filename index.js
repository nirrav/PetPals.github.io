document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM content to be fully loaded
  setTimeout(function () {
    // Select elements
    const brandLogo = document.querySelector('.brand-logo img');
    const preloader = document.querySelector('.preloader');

    // Scale up the brand logo smoothly
    brandLogo.style.transition = 'transform 2s ease-in-out';
    brandLogo.style.transform = 'scale(30)'; // Adjust the scale for smooth gliding

    // Hide the preloader after the fade out animation completes
    setTimeout(function () {
      preloader.style.display = 'none';
    }, 2000); // Adjust the duration before the animation starts as needed
  }, 2000); // Adjust the duration before the animation starts as needed
});

window.onload = function () {
  // Trigger fade out animation for the preloader
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('fade-out');
};

// Toggle dropdown menu when dropdown toggle button is clicked
document.querySelector('#hoverDropdown .dropdown-toggle').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default link behavior
  var dropdownMenu = document.querySelector('#hoverDropdown .dropdown-menu');
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Close dropdown menu when clicking outside of it
document.addEventListener('click', function (e) {
  var dropdownMenu = document.querySelector('#hoverDropdown .dropdown-menu');
  if (!e.target.closest('#hoverDropdown') && dropdownMenu.style.display === 'block') {
    dropdownMenu.style.display = 'none';
  }
});

// Prevent dropdown menu from closing when clicking on it
document.querySelector('#hoverDropdown .dropdown-menu').addEventListener('click', function (e) {
  e.stopPropagation();
});

