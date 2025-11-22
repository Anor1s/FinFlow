import { PageTemplate, Search, FilterCriteria, SelectButton  } from "./Index.js";

const Transactions = {
  render() {
    return PageTemplate.render([
      Search.render(),
      FilterCriteria.render(),
    ]);
  },

  init() {
    SelectButton.afterRender();
  }
};

export default Transactions;
