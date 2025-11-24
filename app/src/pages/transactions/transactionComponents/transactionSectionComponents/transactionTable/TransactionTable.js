import {
  TransactionItem,
  TransactionData,
  PageList,
  PageItem,
  FilterButtonsGetData,
  SortByButtonsGetData,
  NoTransactionsFound,
  SearchBar
} from '../../../index.js'

const TransactionTable = {
  currentPage: 0,
  itemsPerPage: 0,
  totalPages: 0,
  countOfButtons: 0,
  filteredData: [],

  render() {
    return `
      <div class="h-include-top w-full flex flex-col gap-2">
        ${this.renderList()}
        ${this.renderPaginationList()}
      </div>
    `
  },

  renderList() {
    return `
      <ul 
        class="h-full w-full rounded-2xl gradient-secondary py-[16px] overflow-y-auto relative
        divide-y-2  divide-surface-secondary" 
        id="all-transactions-table">
      </ul>
    `
  },

  renderPaginationList() {
    return `
      <div 
        id="pagination-container">
      </div>
    `
  },

  applySort() {
    const sort = SortByButtonsGetData();

    const sortFields = [];

    const amountValue = typeof sort.byAmount === 'string' ? sort.byAmount : sort.byAmount?.value;
    const categoryValue = typeof sort.byCategory === 'string' ? sort.byCategory : sort.byCategory?.value;
    const dateTimeValue = typeof sort.byDateTime === 'string' ? sort.byDateTime : sort.byDateTime?.value;

    if (amountValue && !amountValue.includes('None')) {
      sortFields.push({
        field: 'amount',
        order: amountValue.includes('Asc') ? 1 : -1
      });
    }

    if (categoryValue && !categoryValue.includes('None')) {
      sortFields.push({
        field: 'category',
        order: categoryValue.includes('Asc') ? 1 : -1
      });
    }

    if (dateTimeValue && !dateTimeValue.includes('None')) {
      sortFields.push({
        field: 'dateTime',
        order: dateTimeValue.includes('Asc') ? 1 : -1
      });
    }

    if (sortFields.length === 0) {
      return;
    }

    this.filteredData.sort((a, b) => {
      for (const { field, order } of sortFields) {
        let result = 0;

        switch(field) {
          case 'amount':
            result = (a.amount - b.amount) * order;
            break;

          case 'category':
            result = (a.category || '').localeCompare(b.category || '') * order;
            break;

          case 'dateTime':
            try {
              const dateA = new Date(`${a.date} ${a.time}`);
              const dateB = new Date(`${b.date} ${b.time}`);
              result = (dateA - dateB) * order;
            } catch (e) {
              result = 0;
            }
            break;
        }

        if (result !== 0) return result;
      }

      return 0;
    });
  },

  applySearchBar() {
    const searchQuery = SearchBar.getValue().toLowerCase().trim();

    // Якщо пошуковий запит порожній, застосовуємо тільки фільтри
    if (!searchQuery) {
      this.applyFilters();
      return;
    }

    const filters = FilterButtonsGetData();

    this.filteredData = TransactionData.filter(transaction => {
      if (filters.priceRangeMin !== undefined || filters.priceRangeMax !== undefined) {
        const min = filters.priceRangeMin ?? 0;
        const max = filters.priceRangeMax ?? 1000;
        const amount = transaction.amount;

        const actualMin = Math.min(min, max);
        const actualMax = Math.max(min, max);

        if (amount < actualMin || amount > actualMax) {
          return false;
        }
      }

      if (filters.category && filters.category.value !== '') {
        const transactionCategory = (transaction.category || '');

        const matchesValue = transactionCategory === filters.category.value;
        const matchesText = transactionCategory === filters.category.text;

        if (!matchesValue && !matchesText) {
          return false;
        }
      }

      if (filters.dateTimeFrom && (filters.dateTimeFrom.date || filters.dateTimeFrom.time)) {
        const transactionDateTime = `${transaction.date} ${transaction.time}`;

        if (filters.dateTimeFrom.date && filters.dateTimeFrom.time) {
          const fromDateTime = `${filters.dateTimeFrom.date} ${filters.dateTimeFrom.time}`;
          if (transactionDateTime < fromDateTime) {
            return false;
          }
        } else if (filters.dateTimeFrom.date) {
          if (transaction.date < filters.dateTimeFrom.date) {
            return false;
          }
        }
      }

      if (filters.dateTimeTo && (filters.dateTimeTo.date || filters.dateTimeTo.time)) {
        const transactionDateTime = `${transaction.date} ${transaction.time}`;

        if (filters.dateTimeTo.date && filters.dateTimeTo.time) {
          const toDateTime = `${filters.dateTimeTo.date} ${filters.dateTimeTo.time}`;
          if (transactionDateTime > toDateTime) {
            return false;
          }
        } else if (filters.dateTimeTo.date) {
          if (transaction.date > filters.dateTimeTo.date) {
            return false;
          }
        }
      }

      if (filters.transactionType && filters.transactionType !== '') {
        const transactionType = (transaction.transactionType || '').toLowerCase();
        if (transactionType !== filters.transactionType) {
          return false;
        }
      }

      if (filters.transactionPlace && filters.transactionPlace !== '') {
        const transactionPlace = (transaction.place || '').toLowerCase();
        if (transactionPlace !== filters.transactionPlace) {
          return false;
        }
      }

      if (filters.note && filters.note !== '') {
        const transactionPlace = (transaction.note || '').toLowerCase();
        if (transactionPlace !== filters.note) {
          return false;
        }
      }

      const searchableFields = [
        transaction.category || '',
        transaction.place || '',
        transaction.date || '',
        transaction.time || '',
        transaction.transactionType || '',
        transaction.amount?.toString() || '',
        transaction.note?.toString() || '',
      ];

      return searchableFields.some(field =>
        field.toLowerCase().includes(searchQuery)
      );
    });

    this.applySort();
    this.rebuildTable();
  },

  applyFilters() {
    const filters = FilterButtonsGetData();

    this.filteredData = TransactionData.filter(transaction => {
      // Filter by price range
      if (filters.priceRangeMin !== undefined || filters.priceRangeMax !== undefined) {
        const min = filters.priceRangeMin ?? 0;
        const max = filters.priceRangeMax ?? 1000;
        const amount = transaction.amount;

        const actualMin = Math.min(min, max);
        const actualMax = Math.max(min, max);

        if (amount < actualMin || amount > actualMax) {
          return false;
        }
      }

      // Filter by category
      if (filters.category && filters.category.value !== '') {
        const transactionCategory = (transaction.category || '');
        if (transactionCategory !== filters.category.value) {
          return false;
        }
      }

      // Filter by date/time range (from)
      if (filters.dateTimeFrom && (filters.dateTimeFrom.date || filters.dateTimeFrom.time)) {
        const transactionDateTime = `${transaction.date} ${transaction.time}`;

        if (filters.dateTimeFrom.date && filters.dateTimeFrom.time) {
          const fromDateTime = `${filters.dateTimeFrom.date} ${filters.dateTimeFrom.time}`;
          if (transactionDateTime < fromDateTime) {
            return false;
          }
        } else if (filters.dateTimeFrom.date) {
          if (transaction.date < filters.dateTimeFrom.date) {
            return false;
          }
        }
      }

      // Filter by date/time range (to)
      if (filters.dateTimeTo && (filters.dateTimeTo.date || filters.dateTimeTo.time)) {
        const transactionDateTime = `${transaction.date} ${transaction.time}`;

        if (filters.dateTimeTo.date && filters.dateTimeTo.time) {
          const toDateTime = `${filters.dateTimeTo.date} ${filters.dateTimeTo.time}`;
          if (transactionDateTime > toDateTime) {
            return false;
          }
        } else if (filters.dateTimeTo.date) {
          if (transaction.date > filters.dateTimeTo.date) {
            return false;
          }
        }
      }

      // Filter by transaction type
      if (filters.transactionType && filters.transactionType !== '') {
        const transactionType = (transaction.transactionType || '').toLowerCase();
        if (transactionType !== filters.transactionType) {
          return false;
        }
      }

      // Filter by transaction place
      if (filters.transactionPlace && filters.transactionPlace !== '') {
        const transactionPlace = (transaction.place || '').toLowerCase();
        if (transactionPlace !== filters.transactionPlace) {
          return false;
        }
      }

      return true;
    });

    this.applySort();
    this.rebuildTable();
  },

  rebuildTable() {
    this.currentPage = 0;
    this.calculateItemsPerPage();
    this.updateView();
  },

  calculateItemsPerPage() {
    const table = document.getElementById('all-transactions-table');
    if (!table) return false;

    const gap = 16;
    const itemHeight = 78;
    const tableHeight = table.offsetHeight;

    this.itemsPerPage = Math.max(1, Math.floor((tableHeight - 2 * gap) / itemHeight));
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);

    return true;
  },

  getCurrentPageData() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  },

  renderPagination() {
    if (this.totalPages <= 1) return '';

    const pageButtons = this.generatePageButtons();

    return `
      ${PageList.render(pageButtons)}
    `;
  },

  generatePageButtons() {
    const maxButtons = 4;
    let startPage = Math.max(0, this.currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(this.totalPages, startPage + maxButtons);

    if (endPage - startPage < maxButtons) {
      startPage = Math.max(0, endPage - maxButtons);
    }

    let buttons = '';

    for (let i = startPage; i < endPage; i++) {
      const isActive = i === this.currentPage;
      buttons += `
      ${PageItem.render(isActive, i)}
    `;
    }

    return buttons;
  },

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateView();
    }
  },

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updateView();
    }
  },

  goToPage(page) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updateView();
    }
  },

  updateView() {
    const table = document.getElementById('all-transactions-table');
    const paginationContainer = document.getElementById('pagination-container');

    if (table) {
      const currentPageData = this.getCurrentPageData();

      if (currentPageData.length === 0) {
        table.innerHTML = `
          <li 
            class="flex flex-col text-center gap-lg items-center justify-center 
                  h-full text-text-primary p-4 text-xl mobile:text-2xl uppercase">
            <img 
              class=""
              src="${NoTransactionsFound}"
              alt=""
              width="100"
              height="100"
              loading="lazy"
            />
            No transactions found
          </li>
        `;
      } else {
        table.innerHTML = currentPageData.map(item => TransactionItem.render(item)).join('\n');
      }
    }

    if (paginationContainer) {
      paginationContainer.innerHTML = this.renderPagination();
    }
  },

  init() {
    let resizeTimeout;
    let initialized = false;

    this.filteredData = [...TransactionData];

    this.applySort();

    const table = document.getElementById('all-transactions-table');

    const checkInterval = setInterval(() => {

      if (table && !initialized) {
        initialized = true;

        if (this.calculateItemsPerPage()) {
          this.updateView();
        }

        const paginationContainer = document.getElementById('pagination-container');
        if (paginationContainer) {
          paginationContainer.addEventListener('click', (e) => {
            const action = e.target.closest('button')?.dataset.action;

            if (action === 'prev') {
              this.previousPage();
            } else if (action === 'next') {
              this.nextPage();
            } else if (action === 'page') {
              const page = parseInt(e.target.closest('button').dataset.page);
              this.goToPage(page);
            }
          });
        }

        window.addEventListener("resize", () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            const oldItemsPerPage = this.itemsPerPage;
            this.calculateItemsPerPage();

            if (oldItemsPerPage !== this.itemsPerPage) {
              this.currentPage = 0;
              this.updateView();
            }
          }, 200);
        });

        clearInterval(checkInterval);
      }
    }, 100);
  }
}

window.updateTransactionFilters = function() {
  if (window.TransactionList) {
    window.TransactionList.applySearchBar();
  }
};

window.updateTransactionSort = function() {
  if (window.TransactionList) {
    window.TransactionList.applySort();
    window.TransactionList.rebuildTable();
  }
};

window.TransactionList = TransactionTable;

export default TransactionTable;