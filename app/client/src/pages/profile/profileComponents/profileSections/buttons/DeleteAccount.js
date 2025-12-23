import { AuthService, DeleteAccountIcon } from '../../../index.js'

const DeleteAccountButton = {
  render() {
    return `
      <button
        class="h-button rounded text-text-accent text-base laptop:text-lg cursor-pointer w-full flex flex-row gap-base items-center justify-center hover:underline"
        id="deleteAccount"
      > 
        Delete Account
        <img 
          src="${DeleteAccountIcon}"
          alt="icon"
          width="24"
          height="24"
          loading="lazy"
        />
      </button>
    `
  },

  init() {
    const button = document.getElementById('deleteAccount');
    if (!button) return;

    button.addEventListener('click', async (e) => {
      e.preventDefault();

      // Security check: Ask for user confirmation before deletion.
      const isConfirmed = confirm('Are you sure you want to delete your account? This action is permanent and cannot be undone.');

      if (isConfirmed) {
        try {
          await AuthService.deleteAccount();
          localStorage.removeItem('isLoggedIn');

          alert('Your account has been successfully deleted.');
          window.location.href = '/';

        } catch (error) {
          console.error("ACCOUNT_DELETION_FAILED:", error.message);
          alert(`Error: ${error.message}`);
        }
      }
    });
  }
};

export default DeleteAccountButton;