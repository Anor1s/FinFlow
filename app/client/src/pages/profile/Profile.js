import { PageTemplate, Accounts, ProfileSection, AuthService } from './index.js';

const Profile = {
  render() {
    const isAuth = document.cookie.includes('isLoggedIn=true');

    if (!isAuth) {
      return Accounts.render();
    }

    return PageTemplate.render([
      `<div id="profile-mount-point" class="w-full">
         <p class="text-text-primary text-center p-10">Loading profile...</p>
       </div>`
    ]);
  },

  async init() {
    const isAuth = document.cookie.includes('isLoggedIn=true');

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
        console.error("Auth expired or failed:", error.message);

        document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
      }
    }
  }
};

export default Profile;