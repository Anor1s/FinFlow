import Router from './router/Router.js';
import { restoreCSSGradient, restoreTheme } from './components/other/RestoreThemeAndColors.js'
import Header from './components/Header.js';
import Aside from './components/aside/Aside.js';
import AuthService from './services/AuthService.js';

export async function initApp() {
  restoreCSSGradient();
  restoreTheme();

  await AuthService.checkAuth();

  renderAppLayout();
  Router.init();

  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      Router.navigateTo(href);
    }
  });
}

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');

  setTimeout(() => {
    preloader.classList.add('loader-hidden');

    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 300);
});

function renderAppLayout(title = 'FinFlow') {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="flex flex-col h-screen overflow-auto"> 
        ${Header.render(title)}
        <div class="h-full flex min-h-0">
          ${Aside.render()}
          <main 
            id="main-content" 
            class="h-full flex-1 ml-[75px] tablet:ml-[150px] laptop:ml-[240px] desktop:ml-[325px]">
            <!-- Content will be automatically installed here -->
          </main>
        </div>
      </div>
  `;
}