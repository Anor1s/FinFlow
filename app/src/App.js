import { initRouter, navigateTo } from './router/Router.js';
import { restoreCSSGradient, restoreTheme } from './components/other/RestoreThemeAndColors.js'
import Header from './components/Header.js';
import Aside from './components/aside/Aside.js';

export function initApp() {
  restoreCSSGradient();
  restoreTheme();

  renderAppLayout();
  initRouter();

  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      const href = e.target.getAttribute('href');
      navigateTo(href);
    }
  });
}

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