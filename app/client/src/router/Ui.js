const Ui = {
  updateHeaderTitle(title) {
    const header = document.querySelector('header');
    if (header) {
      const titleElement = header.querySelector('h2');
      if (titleElement) titleElement.textContent = title;
    }
  },

  updateActiveLink(currentPath) {
    document.querySelectorAll('[data-link]').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('[data-icon-link]').forEach(link => link.classList.remove('active-icon'));

    const activeLink = document.querySelector(`[data-link][href="${currentPath}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
      const activeIcon = activeLink.querySelector('[data-icon-link]');
      if (activeIcon) activeIcon.classList.add('active-icon');
    }
  },

  setupRequestIdlePolyfill() {
    if (!window.requestIdleCallback) {
      window.requestIdleCallback = function(cb) {
        const start = Date.now();
        return setTimeout(() => {
          cb({
            didTimeout: false,
            timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
          });
        }, 1);
      };
    }
  }
};

Ui.setupRequestIdlePolyfill();
export default Ui;