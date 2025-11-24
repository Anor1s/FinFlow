const SortButtonCreate = {
  buttonStates: new Map(),

  render(buttonConfig, buttonData) {
    if (!this.buttonStates.has(buttonConfig.buttonId)) {
      this.buttonStates.set(buttonConfig.buttonId, {
        states: buttonData,
        currentState: 'none',
        stateKeys: Object.keys(buttonData)
      });
    }

    const buttonState = this.buttonStates.get(buttonConfig.buttonId);
    const stateIndex = this.getStateIndex(buttonState.currentState);
    const currentStateKey = buttonState.stateKeys[stateIndex];
    const currentButtonData = buttonState.states[currentStateKey];

    return `
      <button  
        class="sort-button min-h-button px-[16px] rounded text-base bg-surface h-full
               w-full text-left text-text-primary hover:bg-surface-response
               hover:text-text-tertiary transition transition-color ease duration-200" 
        title="${currentButtonData.tooltip}"
        type="button"
        id="${buttonConfig.buttonId}"
        data-sort-value="${currentButtonData.value}"
      >
        ${currentButtonData.text} <span>${currentButtonData.icon}</span>
      </button>
    `;
  },

  getStateIndex(state) {
    switch(state) {
      case 'none': return 0;
      case 'asc': return 1;
      case 'desc': return 2;
      default: return 0;
    }
  },


  toggleState(buttonId) {
    const buttonState = this.buttonStates.get(buttonId);
    const stateOrder = ['none', 'asc', 'desc'];
    const currentIndex = stateOrder.indexOf(buttonState.currentState);
    buttonState.currentState = stateOrder[(currentIndex + 1) % stateOrder.length];
  },

  getValue(buttonId) {
    if (!this.buttonStates.has(buttonId)) {
      return { value: '' };
    }

    const buttonState = this.buttonStates.get(buttonId);
    const stateIndex = this.getStateIndex(buttonState.currentState);
    const currentStateKey = buttonState.stateKeys[stateIndex];
    const currentButtonData = buttonState.states[currentStateKey];

    return {
      value: currentButtonData.value
    };
  },

  initButtons() {
    requestAnimationFrame(() => {
      document.addEventListener('click', (e) => {
        const sortButton = e.target.closest('.sort-button');
        if (sortButton) {
          const buttonId = sortButton.id;
          if (this.buttonStates.has(buttonId)) {
            this.toggleState(buttonId);
            const buttonState = this.buttonStates.get(buttonId);
            const buttonConfig = { buttonId };
            const newButtonHtml = this.render(buttonConfig, buttonState.states);
            sortButton.outerHTML = newButtonHtml;

            if (window.updateTransactionSort) {
              window.updateTransactionSort();
            }
          }
        }
      });
    });
  }
};

export default SortButtonCreate;