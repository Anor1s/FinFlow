const Dialog = {
  isOpen: false,

  renderConfirm(message, options) {
    const { confirmText = 'Ok', cancelText = 'Cancel', title = 'Are you sure?' } = options;
    return `
      <div 
        class="fixed inset-0 z-[1000] flex items-center justify-center 
               backdrop-blur-sm bg-black/20 duration-200 px-[32px]"
        id="custom-dialog" 
      >
        <div 
          class="bg-surface border-2 border-tertiary w-full max-w-[350px] 
                rounded-xl p-[16px] shadow-2xl flex flex-col gap-sm"
          id="custom-dialog-window"      
          >
          <h3 class="text-lg font-bold text-text-tertiary">${title}</h3>
          <p class="text-text-primary text-base">${message}</p>
          <div class="flex flex-row gap-base mt-[8px]">
            <button 
              class="w-full h-button rounded-lg bg-surface-secondary text-text-tertiary 
                      font-medium hover:bg-surface-secondary-response transition-colors"
              id="dialog-cancel"
            >
              ${cancelText}
            </button>
            <button 
              class="w-full h-button rounded-lg bg-text-accent text-text-tertiary  font-bold 
                      hover:bg-text-accent/30 duration-200 transition-colors "
              id="dialog-confirm"
            >
             ${confirmText}
            </button>
          </div>
        </div>
      </div>`;
  },

  renderAlert(message, options) {
    const title = options.title
      ? `<b class="block text-sm">${options.title}</b>`
      : '';

    return `
      <div 
        class="fixed top-[30px] left-1/2 -translate-x-1/2 z-[1001] min-w-[400px]  
               duration-200"
        id="custom-alert" 
      >
        <div 
          class="bg-surface border-x-5  rounded-xl p-[16px] 
                shadow-2xl flex flex-col items-center text-center"
          style="border-inline-color: var(--gradient-primary-first)"   
        >
          <div class="text-text-tertiary text-base">
            ${title}
            ${message}
          </div>
        </div>
      </div>`;
  },

  close(modal, isConfirm = true) {
    if (!modal) return;

    setTimeout(() => {
      modal.remove();
      this.isOpen = false;
      if (isConfirm) {
        document.getElementById('app')?.removeAttribute('inert');
        document.body.style.overflow = '';
      }
    }, 200);
  },

  alert(message, options = {}) {
    if (document.getElementById('custom-alert')) return Promise.resolve(null);

    return new Promise((resolve) => {
      document.body.insertAdjacentHTML('beforeend', this.renderAlert(message, options));
      const modal = document.getElementById('custom-alert');

      modal.classList.add('alert');

      const timer = setTimeout(() => {
        modal.classList.remove('alert');
        modal.classList.add('alert-hide');

        this.close(modal, false);
        resolve(true);
      }, 3500);

      modal.onclick = () => {
        clearTimeout(timer);
        this.close(modal, false);
        resolve(true);
      };
    });
  },

  confirm(message, options = {}) {
    if (this.isOpen) return Promise.resolve(null);
    this.isOpen = true;

    return new Promise((resolve) => {
      document.body.insertAdjacentHTML('beforeend', this.renderConfirm(message, options));
      document.getElementById('app')?.setAttribute('inert', '');
      document.body.style.overflow = 'hidden';

      const modal = document.getElementById('custom-dialog');
      const modalWindow = document.getElementById('custom-dialog-window');
      const confirmBtn = document.getElementById('dialog-confirm');
      const cancelBtn = document.getElementById('dialog-cancel');

      modalWindow.classList.add('confirm');

      confirmBtn.onclick = () => {
        modalWindow.classList.remove('confirm');
        modalWindow.classList.add('confirm-hide');

        this.close(modal, true);
        resolve(true);
      };

      cancelBtn.onclick = () => {
        modalWindow.classList.remove('confirm');
        modalWindow.classList.add('confirm-hide');

        this.close(modal, true);
        resolve(false);
      };

      modal.onclick = (e) => {
        if (e.target.id === 'custom-dialog') {
          modalWindow.classList.remove('confirm');
          modalWindow.classList.add('confirm-hide');

          this.close(modal, true);
          resolve(false);
        }
      };
    });
  }
};

export default Dialog;