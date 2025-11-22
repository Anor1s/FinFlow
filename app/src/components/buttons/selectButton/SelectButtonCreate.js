import SelectButtonItem from './SelectButtonItem.js';

const SelectButtonCreate = {
  render(buttonValues, ButtonConfig) {
    return `
      <div class="relative w-full]"  id="custom-select-container">
        <span class="text-base">${ButtonConfig.categoryName}</span>
        <button
          class="custom-select-button w-full px-[16px] py-[8px] text-left mt-[8px] min-h-[40px]
          bg-surface hover:bg-surface-response active:bg-surface-response rounded shadow-sm  
          flex justify-between items-center"
          aria-haspopup="listbox"
          aria-expanded="false"
        >
          <span class="selected-value text-text-primary text-base font-medium">Select option</span>
          <svg 
            class="w-5 h-5 text-gray-400 transition-transform duration-200" 
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
           py-1 absolute z-10 hidden w-full bg-surface-secondary   
           max-h-60 overflow-auto"
           role="listbox"
        >
          ${buttonValues.map(item => SelectButtonItem.render(item)).join('\n')}
        </ul>
      </div>
      
      <input type="hidden" class="selected-option" name="selected_option">
    `;
  },

  afterRender() {
    this.init();
  },

  init() {
    const selectButton = document.querySelector('.custom-select-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const selectedValue = document.querySelector('.selected-value');
    const hiddenInput = document.querySelector('.selected-option');
    const options = document.querySelectorAll('.option-btn');

    if (!selectButton || !dropdownMenu) return;

    selectButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = dropdownMenu.classList.contains('hidden');
      dropdownMenu.classList.toggle('hidden', !isHidden);

      const arrow = selectButton.querySelector('svg');
      arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        const text = option.textContent;

        selectedValue.textContent = text;
        if (hiddenInput) hiddenInput.value = value;

        dropdownMenu.classList.add('hidden');
        const arrow = selectButton.querySelector('svg');
        arrow.style.transform = 'rotate(0deg)';
        selectButton.classList.add('border-blue-500');
      });
    });

    document.addEventListener('click', (e) => {
      if (!selectButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden');
        const arrow = selectButton.querySelector('svg');
        arrow.style.transform = 'rotate(0deg)';
      }
    });
  }
};

export default SelectButtonCreate;