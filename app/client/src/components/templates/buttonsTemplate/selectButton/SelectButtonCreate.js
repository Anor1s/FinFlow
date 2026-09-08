import SelectButtonItem from './SelectButtonItem.js';

const SelectButtonCreate = {
  _isGlobalSetupDone: false,

  render(buttonValues, buttonConfig) {
    this.setupGlobalListeners();

    const optionsWithDefault = [
      { value: '', text: 'Select option' },
      ...buttonValues
    ];

    const currentText = buttonConfig.initialText || 'Select option';
    const currentValue = buttonConfig.initialValue || '';

    return `
      <div 
        class="relative w-full flex flex-col gap-xs" 
        id="select-container-${buttonConfig.buttonId}"
      >
        <!-- Category name --> 
        <span class="text-base text-text-primary">${buttonConfig.categoryName}</span>
        
        <!-- Select button -->
        <button
          class="group custom-select-button w-full px-[16px] text-left min-h-button gap-base 
                bg-surface hover:bg-surface-response active:bg-surface-response rounded 
                flex justify-between items-center overflow-hidden transition-color duration-200"
          data-button-id="${buttonConfig.buttonId}"
          type="button"
        >
          <span 
            class="selected-value text-text-primary group-hover:text-text-tertiary 
                      text-base font-medium pointer-events-none" 
            data-button-id="${buttonConfig.buttonId}"
          >
            ${currentText}
          </span>
          <svg class="w-5 h-5 text-text-primary duration-200 pointer-events-none transition-transform" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24" style="transform: rotate(0deg)">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <!-- Slect button options -->
        <ul 
          class="dropdown-menu transition-all duration-200 border-b-2 rounded-b-lg 
                absolute z-50 hidden w-full bg-surface-secondary overflow-y-auto max-h-60 
                shadow-xl top-full divide-y"
          data-button-id="${buttonConfig.buttonId}"
        >
          ${optionsWithDefault.map(item => SelectButtonItem.render(item, buttonConfig.buttonId)).join('\n')}
        </ul>
  
        <input 
          class="selected-option" 
          type="hidden" 
          value="${currentValue}" 
          data-button-id="${buttonConfig.buttonId}"
        >
      </div>
    `;
  },

  setupGlobalListeners() {
    if (this._isGlobalSetupDone) return;

    document.addEventListener('click', (e) => {
      const target = e.target;

      // Select button
      const btn = target.closest('.custom-select-button');
      if (btn) {
        const buttonId = btn.getAttribute('data-button-id');
        const menu = document.querySelector(`.dropdown-menu[data-button-id="${buttonId}"]`);
        const isHidden = menu.classList.contains('hidden');

        this.closeAllMenus();
        if (isHidden) {
          menu.classList.remove('hidden');
          btn.querySelector('svg').style.transform = 'rotate(180deg)';
        }
        return;
      }

      // Option Button
      const optionBtn = target.closest('.option-btn');
      if (optionBtn) {
        const buttonId = optionBtn.getAttribute('data-button-id');
        const value = optionBtn.getAttribute('data-value');
        const text = optionBtn.querySelector('span').textContent.trim();

        const label = document.querySelector(`.selected-value[data-button-id="${buttonId}"]`);
        const input = document.querySelector(`.selected-option[data-button-id="${buttonId}"]`);

        if (label) label.textContent = text;
        if (input) {
          input.value = value;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }

        this.closeAllMenus();
        if (window.updateTransactionFilters) window.updateTransactionFilters();
        return;
      }

      this.closeAllMenus();
    });

    this._isGlobalSetupDone = true;
  },

  closeAllMenus() {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.custom-select-button svg').forEach(s => s.style.transform = 'rotate(0deg)');
  },

  getValue(buttonId) {
    const input = document.querySelector(`.selected-option[data-button-id="${buttonId}"]`);
    const label = document.querySelector(`.selected-value[data-button-id="${buttonId}"]`);
    return {
      text: label ? label.textContent.trim() : '',
      value: input ? input.value : ''
    };
  }
};

export default SelectButtonCreate;