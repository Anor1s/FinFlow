import {
  PageTemplate,
  AddTransactionDetails,
} from './index.js'

const AddTransactions = {
  render() {
    return PageTemplate.render([
      AddTransactionDetails.render()
    ]);
  },

  init() {
    AddTransactionDetails.init();
  }
};

export default AddTransactions;
