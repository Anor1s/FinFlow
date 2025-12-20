import { SelectButtonCreate } from '../../../index.js';

const ButtonData = [
  {  value: 'income', icon: '📥', text: 'Income' },
  {  value: 'expense', icon: '📤', text: 'Expense' },
];

const ButtonConfig = {
  categoryName: "Currency",
  buttonId: "detailsCurrency",
};


const CurrencyButton = {
  render() {
    return SelectButtonCreate.render(ButtonData, ButtonConfig);
  },

  getValue() {
    return SelectButtonCreate.getValue(ButtonConfig.buttonId).value;
  }
};

export default CurrencyButton;