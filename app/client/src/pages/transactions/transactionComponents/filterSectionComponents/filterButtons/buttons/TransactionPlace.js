import { TextButtonCreate } from '../../../../index.js';

const ButtonConfig = {
  categoryName: "Transaction Place",
  buttonId: "transactionPlace",
};

const TransactionPlaceButton = {
  render() {
    return TextButtonCreate.render(ButtonConfig);
  },

  getValue() {
    return TextButtonCreate.getValue(ButtonConfig);
  }
};

export default TransactionPlaceButton;