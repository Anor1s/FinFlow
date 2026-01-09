import { SectionHeading, TableUi, TransactionsTable } from "../Index.js";
// laptop:h-include-top
const RecentTransactions  = {
  render() {
    return `
      <section class="h-screen w-full pt-[16px] flex flex-col gap-sm  
                       laptop:h-full  laptop:w-2/3 laptop:py-0"
      >
          ${SectionHeading.render('Recent Transactions')}     
          <div class="flex-1 min-h-0">
           ${TableUi.renderMainLayout(false)}     
          </div>   
        
      </section>
    `;
  },

  init() {
    TransactionsTable.init();
  }
};

export default RecentTransactions;