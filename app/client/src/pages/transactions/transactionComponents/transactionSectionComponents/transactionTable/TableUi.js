import { NoTransactionsFound, Transaction, PageItem, PageList } from '../../../index.js';

const TableUi = {
  renderMainLayout(withPagination = true) {
    return `
      <div class="h-full w-full flex flex-col ${withPagination ? 'gap-2' : ''}">
        <ul 
          class="flex-1 w-full rounded-2xl gradient-secondary py-[16px] overflow-hidden relative 
                   divide-y-2 divide-surface-secondary min-h-0" 
          id="all-transactions-table">
        </ul>
          ${withPagination 
          ? '<div class="h-button" id="pagination-container"></div>' 
          : ''}
      </div>
    `;
  },

  renderEmptyState() {
    return `
      <li class="flex flex-col items-center justify-center h-full text-text-primary p-4 text-xl uppercase gap-base">
        <img 
          src="${NoTransactionsFound}" 
          alt="" width="100" 
        /> 
        No transactions found
      </li>
    `;
  },

  renderPagination(totalPages, currentPage) {
    if (totalPages <= 1) return '';

    const maxVisible = 3;
    let buttons = '';

    if (currentPage > 1) {
      buttons += PageItem.render(false, 0);
    }

    let start = Math.max(currentPage === totalPages - 1 ? currentPage - 2 : currentPage - 1, 0);
    let end = Math.min(start + maxVisible, totalPages);

    if (end - start < maxVisible) start = Math.max(0, end - maxVisible);

    for (let i = start; i < end; i++) {
      if (i === 0 && currentPage > 1) continue;

      buttons += PageItem.render(i === currentPage, i);
    }

    return PageList.render(buttons);
  },

  renderData(container, data, currency) {
    if (!container) return;
    if (data.length === 0) {
      container.innerHTML = this.renderEmptyState();
    } else {
      container.innerHTML = data.map(item => Transaction.render(item, currency)).join('\n');
    }
  }
};

export default TableUi;