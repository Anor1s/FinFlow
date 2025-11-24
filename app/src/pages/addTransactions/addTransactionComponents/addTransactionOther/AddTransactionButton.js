import { StandardButtonCreate } from '../../index.js'

const ButtonConfig = {
  text: 'Add Transaction',
  ariaLabel: 'Add new transaction',
  title: 'Click to add a new transaction',
  action: 'add-transaction',
  id: 'addTransaction',
}

const AddTransactionButton = {
  render() {
    return StandardButtonCreate.render(ButtonConfig);
  }
};

export default AddTransactionButton;