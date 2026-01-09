import {
  Routes,
  Cache,
  Auth,
  Ui
} from './index.js';

const Router = {
  currentPath: null,
  VITE_BASE_PATH: (import.meta.env.BASE_URL || '').replace(/\/$/, ''),

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
    let targetPath = path;

    if (Routes[path]?.requiresAuth && !Auth.isAuthenticated()) {
      targetPath = '/profile';
    }

    const fullPath = `${this.VITE_BASE_PATH}${targetPath}`;

    if (window.location.pathname === fullPath && this.currentPath === targetPath) return;

    window.history.pushState(null, null, fullPath);
    this.handleRouteChange();
  },

  handleRouteChange() {
    let path = window.location.pathname;
    if (path.startsWith(this.VITE_BASE_PATH)) {
      path = path.substring(this.VITE_BASE_PATH.length) || '/';
    }

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

    if (Cache.has(path)) {
      mainContent.innerHTML = Cache.get(path);
      Cache.updateQueue(path);
    } else {
      const content = route.component.render();
      mainContent.innerHTML = content;
      Cache.add(path, content);
    }

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