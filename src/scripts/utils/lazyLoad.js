// Optimized lazy loading with better performance and reduced CLS
const observerOptions = {
  rootMargin: '200px 0px', // Load images 200px before they appear in viewport
  threshold: 0.1, // Start loading when 10% of the image is visible
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;

      // Skip if no data-src is provided
      if (!img.dataset.src) return;

      // Apply dimensions to prevent layout shifts if specified
      if (img.dataset.width) img.width = img.dataset.width;
      if (img.dataset.height) img.height = img.dataset.height;

      // Check for WebP support and use modern formats if available
      if (img.dataset.srcWebp && supportsWebp) {
        img.src = img.dataset.srcWebp;
      } else {
        img.src = img.dataset.src;
      }

      // Add loading attribute for native lazy loading as fallback
      if ('loading' in HTMLImageElement.prototype) {
        img.loading = 'lazy';
      }

      // Stop observing after loading
      observer.unobserve(img);
    }
  });
}, observerOptions);

// Check for WebP support
let supportsWebp = false;
(async () => {
  if (!self.createImageBitmap) return;

  const webpData =
    'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  const blob = await fetch(webpData).then((r) => r.blob());

  createImageBitmap(blob).then(
    () => {
      supportsWebp = true;
    },
    () => {
      supportsWebp = false;
    }
  );
})();

// Initialize lazy loading for images with data-src
document.addEventListener('DOMContentLoaded', () => {
  // Find all images with data-src attribute
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach((img) => {
    // Reserve space to prevent layout shifts
    if (img.dataset.width && img.dataset.height) {
      // Calculate and set aspect ratio
      const aspectRatio = (img.dataset.height / img.dataset.width) * 100;
      img.style.aspectRatio = `${img.dataset.width} / ${img.dataset.height}`;

      // Add a placeholder background color while loading
      img.style.backgroundColor = '#f0f0f0';
    }

    observer.observe(img);
  });
});

// Function to fix images that may be added dynamically after initial load
function refreshLazyImages() {
  document
    .querySelectorAll('img[data-src]:not([data-lazy-initialized])')
    .forEach((img) => {
      img.setAttribute('data-lazy-initialized', 'true');

      // Set dimensions to prevent layout shifts
      if (img.dataset.width && img.dataset.height) {
        img.style.aspectRatio = `${img.dataset.width} / ${img.dataset.height}`;
        img.style.backgroundColor = '#f0f0f0';
      }

      observer.observe(img);
    });
}

// Export function for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { refreshLazyImages };
}
