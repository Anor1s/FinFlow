import { SectionHeading, TableUi, TransactionsTable } from "../Index.js";

const RecentTransactions  = {
  render() {
    return `
      <section class="h-screen-pad w-full pt-[16px] flex flex-col gap-sm  
                        laptop:h-full laptop:w-2/3 laptop:py-0"
      >
          ${SectionHeading.render('Recent Transactions')}
          ${TableUi.renderMainLayout(false)}
      </section>
    `;
  },

  init() {
    TransactionsTable.init();
  }
};

export default RecentTransactions;