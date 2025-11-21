import { Dashboard, Analytics, Transactions, AddTransaction, Reports, Settings, Accounts } from './index.js';

const routes = {
  '/': { component: Dashboard, title: 'Dashboard Overview' },
  '/analytics': { component: Analytics, title: 'Analytics' },
  '/transactions': { component: Transactions, title: 'Transactions' },
  '/add-transaction': { component: AddTransaction, title: 'Add Transaction' },
  '/reports': { component: Reports, title: 'Reports' },
  '/settings': { component: Settings, title: 'Settings' },
  '/accounts': { component: Accounts, title: 'Accounts' }
};

let currentPage = null;

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
  const route = routes[path] || routes['/'];
  const PageComponent = route.component;
  const pageTitle = route.title;

  updateHeaderTitle(pageTitle);

  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = PageComponent.render();

  if (PageComponent.init) {
    PageComponent.init();
  }

  currentPage = PageComponent;
  updateActiveLink(path);
  document.title = `${pageTitle} | FinFlow`;
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