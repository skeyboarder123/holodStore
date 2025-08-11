/**
 * Image and Performance Optimizer
 * Runs automatically to optimize page performance
 */

// Check for WebP support
const supportsWebP = (function() {
  const canvas = document.createElement('canvas');
  if (!canvas.getContext || !canvas.getContext('2d')) {
    return false;
  }
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
})();

// Set data attribute on document for CSS selectors
document.documentElement.setAttribute('data-supports-webp', supportsWebP);

// Cache for WebP availability checks to avoid duplicate requests
const webpCheckCache = new Map();

// Fix layout shifts by setting dimensions on images
function fixImageDimensions() {
  document.querySelectorAll('img:not([data-dimensions-set])').forEach((img) => {
    if (img.complete) {
      if (img.width > 0 && img.height > 0) {
        // Apply aspect ratio to prevent layout shifts
        img.style.aspectRatio = `${img.width} / ${img.height}`;
        img.setAttribute('data-dimensions-set', 'true');
      }
    } else {
      img.onload = () => {
        if (img.width > 0 && img.height > 0) {
          img.style.aspectRatio = `${img.width} / ${img.height}`;
          img.setAttribute('data-dimensions-set', 'true');
        }
      };
    }
  });
}

// Convert images to WebP format if supported
function optimizeImageFormats() {
  if (!supportsWebP) return;

  document
    .querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]')
    .forEach((img) => {
      if (img.hasAttribute('data-no-webp')) return;

      // If there's a WebP version specified, use it
      if (img.dataset.srcWebp) {
        img.src = img.dataset.srcWebp;
        return;
      }

      // Otherwise generate WebP URL from current src
      const src = img.src;
      if (src) {
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

        // Check cache first to avoid duplicate requests
        if (webpCheckCache.has(webpSrc)) {
          if (webpCheckCache.get(webpSrc)) {
            img.src = webpSrc;
          }
          return;
        }

        // Check if WebP version exists before switching
        fetch(webpSrc, { method: 'HEAD' })
          .then((response) => {
            const exists = response.ok;
            webpCheckCache.set(webpSrc, exists);
            if (exists) {
              img.src = webpSrc;
            }
            // Тихо игнорируем 404 ошибки для несуществующих WebP файлов
          })
          .catch((error) => {
            // WebP version doesn't exist, keep original format
            webpCheckCache.set(webpSrc, false);
            // Не логируем 404 ошибки, это нормальное поведение
            if (error.name !== 'AbortError') {
              // Логируем только реальные сетевые ошибки, не 404
              console.debug(
                'WebP optimization skipped for:',
                src,
                error.message
              );
            }
          });
      }
    });
}

// Optimize background images
function optimizeBackgroundImages() {
  if (!supportsWebP) return;

  // Find all elements with background images in inline style
  document.querySelectorAll('[style*="background-image"]').forEach((el) => {
    const style = el.getAttribute('style');
    if (!style) return;

    const match = style.match(
      /background-image:\s*url\(['"]?([^'"]+\.(jpg|jpeg|png))['"]?\)/i
    );
    if (match) {
      const imgUrl = match[1];
      const webpUrl = imgUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');

      // Check cache first to avoid duplicate requests
      if (webpCheckCache.has(webpUrl)) {
        if (webpCheckCache.get(webpUrl)) {
          const newStyle = style.replace(imgUrl, webpUrl);
          el.setAttribute('style', newStyle);
        }
        return;
      }

      // Check if WebP version exists
      fetch(webpUrl, { method: 'HEAD' })
        .then((response) => {
          const exists = response.ok;
          webpCheckCache.set(webpUrl, exists);
          if (exists) {
            const newStyle = style.replace(imgUrl, webpUrl);
            el.setAttribute('style', newStyle);
          }
          // Тихо игнорируем 404 ошибки для несуществующих WebP файлов
        })
        .catch((error) => {
          // WebP version doesn't exist, keep original
          webpCheckCache.set(webpUrl, false);
          // Не логируем 404 ошибки, это нормальное поведение
          if (error.name !== 'AbortError') {
            console.debug(
              'WebP background optimization skipped for:',
              imgUrl,
              error.message
            );
          }
        });
    }
  });
}

// Defer offscreen images
function deferOffscreenImages() {
  if (!('IntersectionObserver' in window)) return;

  const lazyImageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            if (supportsWebP && img.dataset.srcWebp) {
              img.src = img.dataset.srcWebp;
            } else {
              img.src = img.dataset.src;
            }
            delete img.dataset.src;
            delete img.dataset.srcWebp;
          }
          lazyImageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: '200px 0px', // Start loading 200px before becoming visible
    }
  );

  document.querySelectorAll('img[data-src]').forEach((img) => {
    lazyImageObserver.observe(img);
  });
}

// Add native lazy loading attribute to images
function addNativeLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach((img) => {
      // Skip already processed or critical images
      if (img.hasAttribute('loading') || img.classList.contains('logo')) return;

      // Use native lazy loading
      img.loading = 'lazy';
    });
  }
}

// Fix font loading to prevent layout shifts
function optimizeFontLoading() {
  // Add class when fonts are loaded
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  }
}

// Add passive event listeners for better scroll performance
function addPassiveEventListeners() {
  const supportsPassive = (function() {
    let result = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          result = true;
          return true;
        },
      });
      window.addEventListener('test', null, opts);
      window.removeEventListener('test', null, opts);
    } catch (e) {}
    return result;
  })();

  if (supportsPassive) {
    // Use passive listeners for scroll events
    const wheelOpts = { passive: true };
    window.addEventListener('wheel', null, wheelOpts);
    window.addEventListener('touchstart', null, wheelOpts);
    window.addEventListener('touchmove', null, wheelOpts);
  }
}

// Run optimizations
function runOptimizations() {
  // Critical optimizations
  fixImageDimensions();
  optimizeFontLoading();
  addPassiveEventListeners();

  // Non-critical optimizations (defer)
  setTimeout(() => {
    addNativeLazyLoading();
    deferOffscreenImages();
  }, 0);

  // Heavy optimizations (run when idle)
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      optimizeImageFormats();
      optimizeBackgroundImages();
    });
  } else {
    setTimeout(() => {
      optimizeImageFormats();
      optimizeBackgroundImages();
    }, 1000);
  }
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runOptimizations);
} else {
  runOptimizations();
}

// Re-run when page content changes (for SPA)
const observer = new MutationObserver((mutations) => {
  let shouldReoptimize = false;
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      // Check if any images were added
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === 'IMG' || node.querySelectorAll) {
          shouldReoptimize = true;
        }
      });
    }
  });

  if (shouldReoptimize) {
    runOptimizations();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
