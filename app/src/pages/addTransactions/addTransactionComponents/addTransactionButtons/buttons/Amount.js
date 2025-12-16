import { DetailButtonsRender } from "../../../index.js";

const AmountButton = {
  render() {
    return `
      <div class="h-full flex flex-col gap-xs">
        <span class="text-base text-text-primary">Amount</span>
        <input 
          class="w-full h-button bg-surface rounded p-[16px] text-text-tertiary" 
          type="number" 
          placeholder="0"
          min="0"
          id="amount-input"
          data-button-id="amount"
        >
      </div>
    `
  },

  init() {
    const input = document.getElementById('amount-input');
    if (input) {
      let timeoutId;

      input.addEventListener('input', (e) => {
        e.target.value = Math.abs(e.target.value);

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          DetailButtonsRender.updatePreview();
        }, 100);
      });

      input.addEventListener('blur', () => {
        clearTimeout(timeoutId);
        DetailButtonsRender.updatePreview();
      });
    }
  },

  getValue() {
    const input = document.getElementById('amount-input');
    return input ? input.value : '';
  }
}

export default AmountButton;