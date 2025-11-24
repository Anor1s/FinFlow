import {
  SectionHeading,
  TransactionTable,
} from '../index.js';

const TransactionsSection = {
  render() {
    return `
      <section class="h-full laptop:h-include-top w-full flex flex-col gap-sm"> 
        ${SectionHeading.render('All transactions')}
        ${TransactionTable.render()}
      </section>
    `;
  },

  init() {
    TransactionTable.init();
  }
};


export default TransactionsSection;