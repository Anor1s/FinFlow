// router.js - Безпечніший підхід без префетчингу render()
import { Dashboard, Analytics, Transactions, AddTransaction, Reports, Settings, Accounts } from './index.js';

const routes = {
  '/': { component: Dashboard, title: 'Dashboard Overview' },
  '/overview': { component: Dashboard, title: 'Dashboard Overview' },
  '/analytics': { component: Analytics, title: 'Analytics' },
  '/transactions': { component: Transactions, title: 'Transactions' },
  '/add-transaction': { component: AddTransaction, title: 'Add Transaction' },
  '/reports': { component: Reports, title: 'Reports' },
  '/settings': { component: Settings, title: 'Settings' },
  '/accounts': { component: Accounts, title: 'Accounts' }
};

// In-memory кеш для швидкого доступу
const pageCache = new Map();
const MAX_CACHE_SIZE = 7;
const cacheQueue = [];

// Кеш компонентів (зберігаємо рендер функції)
const componentCache = new Map();

let currentPage = null;
let currentPath = null;

export function initRouter() {
  window.addEventListener('popstate', handleRouteChange);
  handleRouteChange();
}

export function navigateTo(path) {
  const route = routes[path];
  if (route) {
    window.history.pushState(null, null, path);
    handleRouteChange();
    updateActiveLink(path);
  }
}

function handleRouteChange() {
  const path = window.location.pathname;

  if (currentPath === path) return;

  const previousPath = currentPath;
  currentPath = path;

  const route = routes[path] || routes['/'];
  const PageComponent = route.component;
  const pageTitle = route.title;

  updateHeaderTitle(pageTitle);

  const mainContent = document.getElementById('main-content');

  // Перевіряємо кеш
  if (pageCache.has(path)) {

    mainContent.innerHTML = pageCache.get(path);
    updateCacheQueue(path);
  } else {

    const renderedContent = PageComponent.render();
    mainContent.innerHTML = renderedContent;
    addToCache(path, renderedContent);
  }

  // Ініціалізація компонента
  if (PageComponent.init) {
    PageComponent.init();
  }

  currentPage = PageComponent;
  updateActiveLink(path);
  document.title = `${pageTitle} | FinFlow`;

  // Кешуємо попередню сторінку для швидкого повернення
  if (previousPath && !pageCache.has(previousPath)) {
    requestIdleCallback(() => cachePageSafely(previousPath));
  }
}

// Безпечне кешування сторінки без рендерингу
function cachePageSafely(path) {
  // Замість префетчингу, просто запам'ятовуємо що сторінка була відвідана
  // Реальний рендеринг відбудеться тільки при наступному відвідуванні
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

export function getCacheStats() {
  return {
    renderedPages: pageCache.size,
    maxSize: MAX_CACHE_SIZE,
    paths: [...pageCache.keys()],
    queue: [...cacheQueue]
  };
}

function updateHeaderTitle(title) {
  const header = document.querySelector('header');
  if (header) {
    const titleElement = header.querySelector('h2');
    if (titleElement) {
      titleElement.textContent = title;
    }
  }
}

function updateActiveLink(currentPath) {
  document.querySelectorAll('[data-link]').forEach(link => {
    link.classList.remove('active');
  });
  document.querySelectorAll('[data-icon-link]').forEach(link => {
    link.classList.remove('active-icon');
  });

  const activeLink = document.querySelector(`[data-link][href="${currentPath}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
    const activeIcon = activeLink.querySelector('[data-icon-link]');
    if (activeIcon) {
      activeIcon.classList.add('active-icon');
    }
  }
}

if (!window.requestIdleCallback) {
  window.requestIdleCallback = function(cb) {
    const start = Date.now();
    return setTimeout(function() {
      cb({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);

  };
}