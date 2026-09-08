import { PageTemplate, TransactionFilters, TransactionsSection  } from "./index.js";

const Transactions = {
  render() {
    return PageTemplate.render([
      TransactionFilters.render(),
      TransactionsSection.render(),
    ]);
  },

  init() {
    TransactionFilters.init();
    TransactionsSection.init();
  }
};

export default Transactions;
