import {
  CashStatus,
  Diagrams,
  RecentTransactions,
  PageTemplate,
} from "./Index.js";

const Dashboard = {
  render() {
    return PageTemplate.render([
      CashStatus.render(),
      Diagrams.render(),
      RecentTransactions.render()
    ]);
  },

  init() {
    Diagrams.init();
    RecentTransactions.init();
  }
};

export default Dashboard;

