const DateTimeButtonCreate = {
  debounceTimers: {},

  render(buttonConfig) {
    return `
      <div class="relative w-full flex flex-col gap-xs">
        <span class="text-base">${buttonConfig.categoryName}</span>
        <input
          class="min-h-button px-[16px] bg-surface rounded cursor-pointer
                hover:bg-surface-response text-text-primary hover:text-text-tertiary [color-scheme:dark]
                transition transition-color ease-in-out duration-200
                [&::-webkit-calendar-picker-indicator]:brightness-0 
                [&::-webkit-calendar-picker-indicator]:saturate-[0] 
                [&::-webkit-calendar-picker-indicator]:invert-[0.54] 
                [&::-webkit-calendar-picker-indicator]:sepia-[0.08]"   
          type="datetime-local"
          id="${buttonConfig.buttonId}" 
          placeholder="Select date"
        />
      </div> 
    `
  },

  init(buttonConfig) {
    setTimeout(() => {
      const input = document.getElementById(buttonConfig.buttonId);

      if (input) {
        input.addEventListener('change', (e) => {
          if (this.debounceTimers[buttonConfig.buttonId]) {
            clearTimeout(this.debounceTimers[buttonConfig.buttonId]);
          }

          if (window.updateTransactionFilters) {
            window.updateTransactionFilters();
          }
        });

        input.addEventListener('input', (e) => {
          if (this.debounceTimers[buttonConfig.buttonId]) {
            clearTimeout(this.debounceTimers[buttonConfig.buttonId]);
          }

          this.debounceTimers[buttonConfig.buttonId] = setTimeout(() => {
            if (window.updateTransactionFilters) {
              window.updateTransactionFilters();
            }
          }, 500);
        });
      }
    }, 0);
  },

  getValues(buttonId) {
    try {
      const input = document.getElementById(buttonId);
      if (!input || !input.value) {
        return { date: '', time: '' };
      }
      const [datePart, timePart] = input.value.split('T');
      return {
        date: datePart || '',
        time: timePart || ''
      };
    } catch (error) {
      console.error('Error in getValues:', error);
      return { date: '', time: '' };
    }
  }
};

export default DateTimeButtonCreate;