import { SelectButtonCreate, ExpenseIcon } from '../../../index.js';

const ButtonData = [
  {  value: ExpenseIcon, icon: ExpenseIcon, text: 'Income' },
  {  value: 'expense', icon: '📤', text: 'Expense' },
];

const ButtonConfig = {
  categoryName: "Icon",
  buttonId: "detailsIcon",
};


const IconButton = {
  render() {
    return SelectButtonCreate.render(ButtonData, ButtonConfig);
  },

  getValue() {
    return SelectButtonCreate.getValue(ButtonConfig.buttonId).value;
  }
};

export default IconButton;