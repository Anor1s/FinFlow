const SortButtonCreate = {
  buttonStates: new Map(),
  _isGlobalListenerSetup: false,

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
        <div class="flex justify-between items-center">
          ${currentButtonData.text} 
          <span class="opacity-70">${currentButtonData.icon}</span>
        </div>
      </button>
    `;
  },

  getStateIndex(state) {
    const order = {
      'none': 0,
      'asc': 1,
      'desc': 2
    };
    return order[state] ?? 0;
  },

  toggleState(buttonId) {
    const buttonState = this.buttonStates.get(buttonId);
    if (!buttonState) return;

    const stateOrder = ['none', 'asc', 'desc'];
    const currentIndex = stateOrder.indexOf(buttonState.currentState);
    buttonState.currentState = stateOrder[(currentIndex + 1) % stateOrder.length];
  },

  initButtons() {
    if (this._isGlobalListenerSetup) return;

    document.addEventListener('click', (e) => {
      const sortButton = e.target.closest('.sort-button');
      if (!sortButton) return;

      const buttonId = sortButton.id;
      if (this.buttonStates.has(buttonId)) {
        this.toggleState(buttonId);


        const buttonState = this.buttonStates.get(buttonId);


        const newButtonHtml = this.render({ buttonId }, buttonState.states);
        sortButton.outerHTML = newButtonHtml;

        if (window.updateTransactionSort) {
          window.updateTransactionSort();
        }
      }
    });

    this._isGlobalListenerSetup = true;
  },

  getValue(buttonId) {
    const buttonState = this.buttonStates.get(buttonId);
    if (!buttonState) return { value: '' };

    const stateIndex = this.getStateIndex(buttonState.currentState);
    const currentStateKey = buttonState.stateKeys[stateIndex];
    return { value: buttonState.states[currentStateKey].value };
  }
};

export default SortButtonCreate;