import { PageTemplate, TransactionFilters, TransactionsSection  } from "./index.js";

const Transactions = {
  render() {
    return PageTemplate.render([
      TransactionFilters.render(),
      TransactionsSection.render(),
    ]);
  },

  init() {
    TransactionsSection.init();
  }
};

export default Transactions;
