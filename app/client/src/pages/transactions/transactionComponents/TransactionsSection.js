import {
  SectionHeading,
  TransactionsTable,
} from '../index.js';

const TransactionsSection = {
  render() {
    return `
      <section class="h-full laptop:h-include-top w-full flex flex-col gap-sm"> 
        ${SectionHeading.render('All transactions')}
        ${TransactionsTable.render()}
      </section>
    `;
  },

  init() {
    TransactionsTable.init();
  }
};


export default TransactionsSection;