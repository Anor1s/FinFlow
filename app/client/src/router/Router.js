import {
  Routes, // Зверни увагу: імпорт з великої літери
  Cache,
  Auth,
  Ui
} from './index.js';

const Router = {
  currentPath: null,

  init() {
    window.addEventListener('popstate', () => this.handleRouteChange());

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigateTo(link.getAttribute('href'));
      }
    });

    this.handleRouteChange();
  },

  navigateTo(path) {
    const route = Routes[path];
    let targetPath = path;

    if (route?.requiresAuth && !Auth.isAuthenticated()) {
      targetPath = '/profile';
    }

    if (window.location.pathname === targetPath && this.currentPath === targetPath) return;

    window.history.pushState(null, null, targetPath);
    this.handleRouteChange();
  },

  handleRouteChange() {
    const path = window.location.pathname;

    let route = Routes[path];

    if (!route) {
      const fallback = Auth.isAuthenticated() ? '/overview' : '/profile';
      this.navigateTo(fallback);
      return;
    }

    if (route.requiresAuth && !Auth.isAuthenticated()) {
      console.warn('Access restricted: auth required');
      this.navigateTo('/profile');
      return;
    }

    if (this.currentPath === path) return;

    const previousPath = this.currentPath;
    this.currentPath = path;

    Ui.updateHeaderTitle(route.title);
    const mainContent = document.getElementById('main-content');

    // Caching Logic
    if (Cache.has(path)) {
      mainContent.innerHTML = Cache.get(path);
      Cache.updateQueue(path);
    } else {
      const content = route.component.render();
      mainContent.innerHTML = content;
      Cache.add(path, content);
    }

    // Component logic initialization
    if (route.component.init) {
      route.component.init();
    }

    Ui.updateActiveLink(path);
    document.title = `${route.title} | FinFlow`;

    if (previousPath && !Cache.has(previousPath)) {
      window.requestIdleCallback(() => {
        Cache.saveComponentSafely(previousPath, Routes[previousPath]?.component);
      });
    }
  }
};

export default Router;