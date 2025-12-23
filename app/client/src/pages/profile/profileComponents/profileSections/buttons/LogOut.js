import { StandardButtonCreate, LogOutIcon, AuthService } from '../../../index.js'
import { clearCache } from '../../../../../router/Router.js';

const ButtonConfig = {
  text: 'Log Out',
  icon: LogOutIcon,
  ariaLabel: 'Logout from your account',
  title: 'Click to log out from your profile',
  action: 'logout',
  id: 'logoutButton',
  buttonType: 'button'
}

const LogOutButton = {
  render() {
    return StandardButtonCreate.render(ButtonConfig);
  },

  init() {
    const button = document.getElementById('logoutButton');

    if (button) {
      button.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
          await AuthService.logout();

          if (typeof clearCache === 'function') {
            clearCache();
          }

          window.location.reload();;
        } catch (error) {
          localStorage.clear();
          window.location.reload();;
        }
      });
    }
  }
};

export default LogOutButton;