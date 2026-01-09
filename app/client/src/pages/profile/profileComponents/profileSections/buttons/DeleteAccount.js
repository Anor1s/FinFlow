import { AuthService, DeleteAccountIcon, Dialog } from '../../../index.js'


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

      const confirmed = await Dialog.confirm('Are you sure you want to delete your account? This action is permanent and cannot be undone.', {
        title: 'Confirm delete account',
        confirmText: 'Delete',
        cancelText: 'Back',
      });

      if (confirmed) {
        try {
          await AuthService.deleteAccount();
          localStorage.removeItem('isLoggedIn');

          Dialog.alert('Your account has been successfully deleted.');

          setTimeout(() => {
            window.location.href = '/';
          }, 500);

        } catch (error) {
          console.error("ACCOUNT_DELETION_FAILED:", error.message);
          alert(`Error: ${error.message}`);
        }
      }
    });
  }
};

export default DeleteAccountButton;