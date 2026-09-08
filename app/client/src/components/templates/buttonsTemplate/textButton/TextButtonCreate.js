import { Debounce } from '../../../other/Utilities.js'

const TextButtonCreate = {
  render(ButtonConfig) {
    const html = `
      <div class="flex flex-col h-full w-full text-text-primary gap-xs">
        <span class="text-base">${ButtonConfig.categoryName}</span>
        <div class="hover:bg-surface-response duration-200 transition-bg 
                    bg-surface rounded flex flex-row items-center 
                    px-3 gap-sm min-h-button h-full">
          <input type="text" 
                 class="w-full bg-transparent outline-none text-base text-text-tertiary placeholder:text-text-ptimary" 
                 placeholder="Place..." 
                 id="${ButtonConfig.buttonId}">
        </div>
      </div>
    `;

    requestAnimationFrame(() => this.init(ButtonConfig));

    return html;
  },

  init(ButtonConfig) {
    const input = document.getElementById(ButtonConfig.buttonId);

    if (!input) return;

    const debouncedUpdate = Debounce(() => {
      console.log(`Filter update triggered by: ${ButtonConfig.buttonId}`);
      if (window.updateTransactionFilters) {
        window.updateTransactionFilters();
      }
    }, 200);

    input.addEventListener('input', debouncedUpdate);

    input.addEventListener('blur', () => {
      if (window.updateTransactionFilters) {
        window.updateTransactionFilters();
      }
    });
  },

  getValue(ButtonConfig) {
    const input = document.getElementById(ButtonConfig.buttonId);
    return input ? input.value.trim() : '';
  }
};

export default TextButtonCreate;