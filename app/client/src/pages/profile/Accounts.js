import { PageTemplate, Login, SignUp } from './index.js';

const Accounts = {
  currentView: 'login',

  render() {
    const activeForm = this.currentView === 'login'
      ? Login.render()
      : SignUp.render();

    return PageTemplate.render([activeForm]);
  },

  init() {
    if (this.currentView === 'login') {
      Login.init();
    } else {
      SignUp.init();
    }

    this.attachEventListeners();
  },

  switchView(newView) {
    this.currentView = newView;

    const mainContent = document.getElementById('main-content');

    mainContent.innerHTML = this.render();

    this.init();
  },

  attachEventListeners() {
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