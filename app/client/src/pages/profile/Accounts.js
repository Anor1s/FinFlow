import { PageTemplate, Login, SignUp } from './index.js';

const Accounts = {
  // 1. Стан: яку форму показувати за замовчуванням
  currentView: 'login',

  render() {
    // Вибираємо форму залежно від стану
    const activeForm = this.currentView === 'login'
      ? Login.render()
      : SignUp.render();

    return PageTemplate.render([activeForm]);
  },

  init() {
    // 2. Ініціалізуємо активну форму (валідація і т.д.)
    if (this.currentView === 'login') {
      Login.init();
    } else {
      SignUp.init();
    }

    // 3. Навішуємо обробники на кнопки перемикання
    this.attachEventListeners();
  },

  switchView(newView) {
    this.currentView = newView;

    // Знаходимо контейнер, куди роутер вставив наш компонент
    const mainContent = document.getElementById('main-content');

    // Перемальовуємо вміст
    mainContent.innerHTML = this.render();

    // ВАЖЛИВО: після оновлення HTML потрібно заново викликати init()
    this.init();
  },

  attachEventListeners() {
    // Шукаємо посилання для перемикання за ID
    const toSignUpBtn = document.getElementById('switchToSignUp');
    const toLogInBtn = document.getElementById('switchToLogin');

    if (toSignUpBtn) {
      toSignUpBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('signup');
      });
    }

    if (toLogInBtn) {
      toLogInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.switchView('login');
      });
    }
  }
};

export default Accounts;