import { PageTemplate, Accounts, ProfileSection, AuthService } from './index.js';

const Profile = {
  render() {
    const isAuth = localStorage.getItem('isLoggedIn') === 'true';

    if (!isAuth) {
      return Accounts.render();
    }

    return PageTemplate.render([
      `<div id="profile-mount-point" class="w-full">
         <p class="text-text-primary">Loading profile...</p>
       </div>`
    ]);
  },

  async init() {
    const isAuth = localStorage.getItem('isLoggedIn') === 'true';

    if (!isAuth) {
      Accounts.init();
    } else {
      try {
        const response = await AuthService.getProfile();
        const user = response.user;

        const mountPoint = document.getElementById('profile-mount-point');

        if (mountPoint) {
          mountPoint.innerHTML = ProfileSection.render(user);

          ProfileSection.init();
        }

      } catch (error) {
        console.error("Failed to initialize profile:", error.message);
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
      }
    }
  }
};

export default Profile;