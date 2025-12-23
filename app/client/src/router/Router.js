import {
  Dashboard,
  Analytics,
  Transactions,
  AddTransaction,
  Reports,
  Settings,
  Profile,
} from './index.js';

const routes = {
  '/': {
    component: Profile,
    title: 'Profile',
    requiresAuth: true
  },
  '/overview': {
    component: Dashboard,
    title: 'Dashboard Overview',
    requiresAuth: true
  },
  '/analytics': {
    component: Analytics,
    title: 'Analytics',
    requiresAuth: true
  },
  '/transactions': {
    component: Transactions,
    title: 'Transactions',
    requiresAuth: true
  },
  '/add-transaction': {
    component: AddTransaction,
    title: 'Add Transaction',
    requiresAuth: true
  },
  '/reports': {
    component: Reports,
    title: 'Reports',
    requiresAuth: true
  },
  '/settings': {
    component: Settings,
    title: 'Settings',
    requiresAuth: true
  },
  '/profile': {
    component: Profile,
    title: 'Profile',
    requiresAuth: false
  }
};

// Сховище та кеш
const pageCache = new Map();
const MAX_CACHE_SIZE = 7;
const cacheQueue = [];
const componentCache = new Map();

let currentPage = null;
let currentPath = null;

// 2. Допоміжна функція перевірки авторизації
function isAuthenticated() {
  return !!localStorage.getItem('accessToken');
}

export function initRouter() {
  window.addEventListener('popstate', handleRouteChange);
  handleRouteChange();
}

export function navigateTo(path) {
  // Отримуємо роут для перевірки перед переходом
  const route = routes[path] || routes['/accounts'];

  // Якщо роут вимагає авториз., а її немає — примусово йдемо на /accounts
  if (route.requiresAuth && !isAuthenticated()) {
    window.history.pushState(null, null, '/accounts');
  }
  // Якщо ми залогінені і йдемо на сторінку входу — перекидаємо на головну
  else if (path === '/accounts' && isAuthenticated()) {
    window.history.pushState(null, null, '/overview');
  }
  else {
    window.history.pushState(null, null, path);
  }

  handleRouteChange();
}

function handleRouteChange() {
  const path = window.location.pathname;

  // Знаходимо поточний роут або редиректимо на вхід
  let route = routes[path];

  if (!route) {
    // Якщо шлях невідомий, вирішуємо куди кинути користувача
    const fallbackPath = isAuthenticated() ? '/overview' : '/accounts';
    navigateTo(fallbackPath);
    return;
  }

  // ПЕРЕВІРКА ДОСТУПУ (Middleware)
  if (route.requiresAuth && !isAuthenticated()) {
    console.warn('Доступ обмежено: необхідна авторизація');
    navigateTo('/accounts');
    return;
  }

  if (path === '/accounts' && isAuthenticated()) {
    navigateTo('/overview');
    return;
  }

  // Якщо шлях не змінився — нічого не робимо
  if (currentPath === path) return;

  const previousPath = currentPath;
  currentPath = path;

  const PageComponent = route.component;
  const pageTitle = route.title;

  updateHeaderTitle(pageTitle);

  const mainContent = document.getElementById('main-content');

  // Логіка кешування
  if (pageCache.has(path)) {
    mainContent.innerHTML = pageCache.get(path);
    updateCacheQueue(path);
  } else {
    const renderedContent = PageComponent.render();
    mainContent.innerHTML = renderedContent;
    addToCache(path, renderedContent);
  }

  // Ініціалізація JS логіки компонента
  if (PageComponent.init) {
    PageComponent.init();
  }

  currentPage = PageComponent;
  updateActiveLink(path);
  document.title = `${pageTitle} | FinFlow`;

  // Безпечне фонове кешування
  if (previousPath && !pageCache.has(previousPath)) {
    requestIdleCallback(() => cachePageSafely(previousPath));
  }
}

// --- СИСТЕМНІ ФУНКЦІЇ (Кеш, заголовок, активні посилання) ---

function cachePageSafely(path) {
  componentCache.set(path, routes[path]?.component);
}

function addToCache(path, content) {
  if (cacheQueue.length >= MAX_CACHE_SIZE) {
    const oldestPath = cacheQueue.shift();
    pageCache.delete(oldestPath);
  }
  pageCache.set(path, content);
  cacheQueue.push(path);
}

function updateCacheQueue(path) {
  const index = cacheQueue.indexOf(path);
  if (index > -1) {
    cacheQueue.splice(index, 1);
    cacheQueue.push(path);
  }
}

export function clearCache() {
  pageCache.clear();
  cacheQueue.length = 0;
  componentCache.clear();
}

function updateHeaderTitle(title) {
  const header = document.querySelector('header');
  if (header) {
    const titleElement = header.querySelector('h2');
    if (titleElement) titleElement.textContent = title;
  }
}

function updateActiveLink(currentPath) {
  document.querySelectorAll('[data-link]').forEach(link => link.classList.remove('active'));
  document.querySelectorAll('[data-icon-link]').forEach(link => link.classList.remove('active-icon'));

  const activeLink = document.querySelector(`[data-link][href="${currentPath}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
    const activeIcon = activeLink.querySelector('[data-icon-link]');
    if (activeIcon) activeIcon.classList.add('active-icon');
  }
}

// Polyfill для requestIdleCallback
if (!window.requestIdleCallback) {
  window.requestIdleCallback = function(cb) {
    const start = Date.now();
    return setTimeout(function() {
      cb({
        didTimeout: false,
        timeRemaining: function() { return Math.max(0, 50 - (Date.now() - start)); }
      });
    }, 1);
  };
}