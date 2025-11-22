import SelectButtonCreate from '../SelectButtonCreate.js';

const FilterButtonsData = [
  {  value: 'income', icon: '📥', text: 'Income' },
  {  value: 'expense', icon: '📤', text: 'Expense' },
  {  value: 'transfer', icon: '↔️', text: 'Transfer' }
];

const ButtonConfig = {
  categoryName: "2",
  size: "2",
};


const abc = {
  render() {
    return SelectButtonCreate.render(FilterButtonsData, ButtonConfig);
  }
};

export default abc;