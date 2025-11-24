import { SortButtonCreate} from '../../../../index.js';

const ButtonData = {
  amountNone: {
    value: 'amountNone',
    icon: '↕',
    text: 'Amount',
    tooltip: 'Clear amount sorting'
  },
  amountAsc: {
    value: 'amountAsc',
    icon: '↑',
    text: 'Amount',
    tooltip: 'Sort by amount: lowest first'
  },
  amountDesc: {
    value: 'amountDesc',
    icon: '↓',
    text: 'Amount',
    tooltip: 'Sort by amount: highest first'
  },
};

const ButtonConfig = {
  buttonId: "sortByAmount",
};

const SortByAmountButton = {
  render() {
    return SortButtonCreate.render(ButtonConfig, ButtonData);
  },

  getValue() {
    return SortButtonCreate.getValue(ButtonConfig.buttonId).value;
  }
};

export default SortByAmountButton;