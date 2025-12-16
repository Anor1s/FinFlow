import { PageTemplate, Login, SignUp } from './index.js';

const Accounts = {
  render() {
    return PageTemplate.render([
        Login.render(),
        SignUp.render(),
      ])
    ;
  },

  init() {
    Login.init();
    SignUp.init();
  }
};

export default Accounts;
