const DateTimeButtonCreate = {
  _isGlobalSetupDone: false,
  debounceTimers: {},

  render(buttonConfig) {
    this.setupGlobalListeners();

    const value = buttonConfig.defaultValue || '';

    return `
      <div class="relative w-full flex flex-col gap-xs">
        <span class="text-base text-text-primary">${buttonConfig.categoryName}</span>
        <input
          class="datetime-input min-h-button px-[16px] bg-surface rounded cursor-pointer
                hover:bg-surface-response text-text-primary hover:text-text-tertiary [color-scheme:dark]
                transition transition-color ease-in-out duration-200 
                [&::-webkit-calendar-picker-indicator]:brightness-0          
                [&::-webkit-calendar-picker-indicator]:invert-[54%]
                [&::-webkit-calendar-picker-indicator]:hover:invert-[70%]"   
          type="datetime-local"
          lang="en-US"
          id="${buttonConfig.buttonId}" 
          data-button-id="${buttonConfig.buttonId}"
          value="${value}" 
        />
      </div> 
    `;
  },

  setValue(buttonId, value) {
    const input = document.getElementById(buttonId);
    if (input) {
      input.value = value;
      input.setAttribute('value', value);

      input.dispatchEvent(new Event('change', { bubbles: true }));

      if (window.updateTransactionFilters) {
        window.updateTransactionFilters();
      }
    } else {
      console.error(error);
    }
  },

  setupGlobalListeners() {
    if (this._isGlobalSetupDone) return;

    document.addEventListener('input', (e) => {
      const target = e.target.closest('.datetime-input');
      if (!target) return;

      const buttonId = target.getAttribute('data-button-id');

      clearTimeout(this.debounceTimers[buttonId]);

      this.debounceTimers[buttonId] = setTimeout(() => {
        if (window.updateTransactionFilters) window.updateTransactionFilters();
      }, 200);
    });

    document.addEventListener('change', (e) => {
      if (e.target.closest('.datetime-input')) {
        if (window.updateTransactionFilters) window.updateTransactionFilters();
      }
    });

    this._isGlobalSetupDone = true;
  },

  init(buttonConfig) {},

  getValues(buttonId) {
    const input = document.getElementById(buttonId);
    if (!input || !input.value) return { date: '', time: '' };

    const [date, time] = input.value.split('T');
    return { date: date || '', time: time || '' };
  }
};

export default DateTimeButtonCreate;