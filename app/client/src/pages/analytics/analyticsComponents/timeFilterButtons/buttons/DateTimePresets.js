import { SelectButtonCreate, DateTimePresetManager } from "../../../index.js";


const ButtonData = [
  { value: 'today', text: '0 - Today' },
  { value: 'yesterday', text: '1 - Yesterday' },
  { value: 'lastWeek', text: '7 - Last Week' },
  { value: 'lastMonth', text: '30 - Last Month' },
  { value: 'lastYear', text: '365 - Last Year' },
  { value: 'allTime', text: 'All Time' },
];

const ButtonConfig = {
  categoryName: "Date & Time Presets",
  buttonId: "analyticsDateTimePresets",
};

const DateTimePresetsButton = {
  _isListenerSetup: false,

  render() {
    return `
      <div id="${ButtonConfig.buttonId}">
        ${SelectButtonCreate.render(ButtonData, ButtonConfig)}
      </div>
    `;
  },

  init() {
    if (this._isListenerSetup) return;

    document.addEventListener('click', (e) => {
      const container = e.target.closest(`#${ButtonConfig.buttonId}`);
      if (!container) return;

      const option = e.target.closest('[data-value]');
      if (option) {
        const val = option.getAttribute('data-value');


        DateTimePresetManager.handlePresetChange(val);
      }
    });

    this._isListenerSetup = true;
  },

  getValue() {
    const res = SelectButtonCreate.getValue(ButtonConfig.buttonId);
    return res ? res.value : '';
  }
};

export default DateTimePresetsButton;