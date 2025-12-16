import SelectButtonItem from './SelectButtonItem.js';

const SelectButtonCreate = {render(buttonValues, buttonConfig) {

    const optionsWithDefault = [
      { value: '', text: 'Select option' },
      ...buttonValues
    ];

    const html = `
    <div class="relative w-full flex flex-col gap-xs " id="select-container-${buttonConfig.buttonId}">
      <span class="text-base">${buttonConfig.categoryName}</span>
      <button
        class="group custom-select-button w-full px-[16px] text-left min-h-button  gap-base 
              bg-surface hover:bg-surface-response active:bg-surface-response rounded 
              flex justify-between items-center overflow-hidden"
        aria-haspopup="listbox"
        aria-expanded="false"
        data-button-id="${buttonConfig.buttonId}"
      >
        <span 
          class="selected-value text-text-primary group-hover:text-text-tertiary text-base font-medium
                 transition-all ease duration-200 overflow-hidden" 
          data-button-id="${buttonConfig.buttonId}"
        >
          Select option
        </span>

        <svg 
          class="w-5 h-5 text-text-primary duration-200 
                group-hover:text-text-tertiary transition transition-color ease" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
    
      <ul
        class="dropdown-menu transition-all duration-200 border-b-2 rounded-b-lg 
              absolute z-10 hidden w-full bg-surface-secondary
              overflow-y-auto max-h-60 divide-y-1 top-full"
         role="listbox"
         data-button-id="${buttonConfig.buttonId}"
      >
        ${optionsWithDefault.map(item => SelectButtonItem.render(item, buttonConfig.buttonId)).join('\n')}
      </ul>
    </div>
    
    <input 
      class="selected-option"
      type="hidden"  
      name="selected_option_${buttonConfig.buttonId}" 
      data-button-id="${buttonConfig.buttonId}"
    >
  `;

    const container = document.createElement('div');
    container.innerHTML = html;

    requestAnimationFrame(() => this.init(buttonConfig.buttonId));

    return html;
  },

  init(buttonId) {
    const selectButton = document.querySelector(`[data-button-id="${buttonId}"].custom-select-button`);
    const dropdownMenu = document.querySelector(`[data-button-id="${buttonId}"].dropdown-menu`);
    const selectedValue = document.querySelector(`[data-button-id="${buttonId}"].selected-value`);
    const hiddenInput = document.querySelector(`[data-button-id="${buttonId}"].selected-option`);

    if (!selectButton || !dropdownMenu) {
      console.warn(`SelectButton with id "${buttonId}" not found in DOM`);
      return;
    }

    selectButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = dropdownMenu.classList.contains('hidden');

      document.querySelectorAll('.dropdown-menu:not(.hidden)').forEach(menu => {
        if (menu !== dropdownMenu) {
          menu.classList.add('hidden');
          const otherButton = document.querySelector(`[data-button-id="${menu.getAttribute('data-button-id')}"].custom-select-button`);
          const otherArrow = otherButton?.querySelector('svg');
          if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
        }
      });

      dropdownMenu.classList.toggle('hidden', !isHidden);

      const arrow = selectButton.querySelector('svg');
      arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.dropdown-menu:not(.hidden)').forEach(menu => {
          menu.classList.add('hidden');
          const button = document.querySelector(`[data-button-id="${menu.getAttribute('data-button-id')}"].custom-select-button`);
          const arrow = button?.querySelector('svg');
          if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
      }
    });

    dropdownMenu.addEventListener('click', (e) => {
      const option = e.target.closest('[data-value]');

      if (option) {
        const value = option.getAttribute('data-value');

        selectedValue.textContent = option.textContent.trim();
        if (hiddenInput) hiddenInput.value = value;

        dropdownMenu.classList.add('hidden');
        const arrow = selectButton.querySelector('svg');
        arrow.style.transform = 'rotate(0deg)';

        if (window.updateTransactionFilters) {
          window.updateTransactionFilters();
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!selectButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
        const arrow = selectButton.querySelector('svg');
        arrow.style.transform = 'rotate(0deg)';
      }
    });
  },

  getValue(buttonId) {
    const selectedValue = document.querySelector(`[data-button-id="${buttonId}"].selected-value`);
    const hiddenInput = document.querySelector(`[data-button-id="${buttonId}"].selected-option`);

    if (!selectedValue || !hiddenInput) {
      return { text: '', value: '' };
    }

    return {
      text: selectedValue.textContent,
      value: hiddenInput.value
    };
  }
};

export default SelectButtonCreate;