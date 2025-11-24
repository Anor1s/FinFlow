import { SortButtonCreate } from '../../../../index.js';

const ButtonData = {
  dateTimeDesc: {
    value: 'dateTimeDesc',
    icon: '↓',
    text: 'DateTime',
    tooltip: 'Sort by date: newest first'
  },
  dateTimeAsc: {
    value: 'dateTimeAsc',
    icon: '↑',
    text: 'DateTime',
    tooltip: 'Sort by date: oldest first'
  },
  dateTimeNone: {
    value: 'dateTimeNone',
    icon: '↕',
    text: 'DateTime',
    tooltip: 'Clear date sorting'
  }
};

const ButtonConfig = {
  buttonId: "sortByDateTime",
};

const SortByDateTimeButton = {
  render() {
    return SortButtonCreate.render(ButtonConfig, ButtonData);
  },

  getValue() {
    return SortButtonCreate.getValue(ButtonConfig.buttonId).value;
  }
};

export default SortByDateTimeButton;