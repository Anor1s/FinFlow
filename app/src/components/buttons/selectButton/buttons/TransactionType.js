import SelectButtonCreate from '../SelectButtonCreate.js';

const FilterButtonsData = [
  {  value: 'income', icon: '📥', text: 'Income' },
  {  value: 'expense', icon: '📤', text: 'Expense' },
  {  value: 'transfer', icon: '↔️', text: 'Transfer' }
];

const ButtonConfig = {
  categoryName: "Transaction Type",
  size: "1",
};


const TransactionTypeButton = {
  render() {
    return SelectButtonCreate.render(FilterButtonsData, ButtonConfig);
  }
};

export default TransactionTypeButton;