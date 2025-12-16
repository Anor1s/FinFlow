const PriceRangeButtonCreate = {
  render(buttonConfig) {
    const html = `
      <div class="flex flex-col h-full w-full text-text-primary gap-xs">
        <span class="text-base">Price Range</span>
        <div class="hover:bg-surface-response duration-200 transition-bg 
                    bg-surface rounded flex flex-row justify-between 
                    items-center px-3 gap-lg min-h-button h-full">
          <div class="hover:text-text-tertiary transition-color duration-200  
                      flex items-center gap-sm">
            <span class="text-base">From:</span>
            <input type="number" 
                   class="w-full border-b border-text-primary text-base" 
                   placeholder="Min" 
                   min="0"
                   id="${buttonConfig.buttonInputMinId}">
          </div>
          
          <div class="hover:text-text-tertiary transition-color duration-200
                      flex items-center gap-2 justify-end">
            <span class="text-base">To:</span>
            <input type="number" 
                   class="w-full border-b border-text-primary text-base" 
                   placeholder="Max" 
                   min="0"
                   id="${buttonConfig.buttonInputMaxId}">
          </div>
        </div>
      </div>
    `;

    requestAnimationFrame(() => this.init(buttonConfig));

    return html
  },

  init(buttonConfig) {
    const minInput = document.getElementById(buttonConfig.buttonInputMinId);
    const maxInput = document.getElementById(buttonConfig.buttonInputMaxId);

    if (!minInput || !maxInput) return;

    const validateRange = () => {
      let minValue = parseInt(minInput.value) || 0;
      let maxValue = parseInt(maxInput.value) || Infinity;

      if (minValue < 0) minInput.value = 0;
      if (maxValue < 0) maxInput.value = 0;

      if (window.updateTransactionFilters) {
        window.updateTransactionFilters();
      }
    };

    minInput.addEventListener('input', validateRange);
    maxInput.addEventListener('input', validateRange);
  },

  getValues(buttonConfig) {
    const min = parseInt(document.getElementById(buttonConfig.buttonInputMinId)?.value) || 0;
    const max = parseInt(document.getElementById(buttonConfig.buttonInputMaxId)?.value) || 1000;

    return {
      min: Math.max(0, min),
      max: Math.max(0, max)
    };
  }
};

export default PriceRangeButtonCreate;