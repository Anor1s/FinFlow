import { SelectButtonCreate, TransactionTypeButtonData } from '../../../index.js';

const ButtonConfig = {
  categoryName: "Transaction Type*",
  buttonId: "detailsTransactionType",
};


const TransactionTypeButton = {
  render() {
    return SelectButtonCreate.render(TransactionTypeButtonData, ButtonConfig);
  },

  getValue() {
    return SelectButtonCreate.getValue(ButtonConfig.buttonId).value;
  }
};

export default TransactionTypeButton;