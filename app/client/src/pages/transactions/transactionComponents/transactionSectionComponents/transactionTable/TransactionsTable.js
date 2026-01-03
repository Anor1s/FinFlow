import {
  FilterButtonsGetData, SortByButtonsGetData, SearchBar,
  TransactionStore, TableUi, TableLogic, TablePagination, AppStore,
  TransactionModal
} from '../../../index.js';

const TransactionTable = {
  currentPage: 0,
  itemsPerPage: 0,
  totalPages: 0,
  originalData: [],
  filteredData: [],

  render() {
    return TableUi.renderMainLayout();
  },

  applyFilters() {
    const filters = FilterButtonsGetData();
    const searchQuery = SearchBar.getValue() ? SearchBar.getValue().toLowerCase().trim() : "";

    this.filteredData = this.originalData.filter(transaction => {
      if (TableLogic.isFilteredOut(transaction, filters)) return false;

      if (searchQuery) {
        const searchableFields = [
          transaction.category || '',
          transaction.place || '',
          transaction.note || '',
          transaction.amount?.toString() || ''
        ];
        return searchableFields.some(field => field.toLowerCase().includes(searchQuery));
      }
      return true;
    });

    this.filteredData = TableLogic.applySort(this.filteredData, SortByButtonsGetData());
    this.rebuildTable();
  },

  rebuildTable() {
    const table = document.getElementById('all-transactions-table');
    if (!table) return;

    this.currentPage = 0;
    this.itemsPerPage = TablePagination.calculateItemsPerPage(table);
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.updateView();
  },

  updateView() {
    const table = document.getElementById('all-transactions-table');
    if (!table) return;

    const currentPageData = TablePagination.getPageSlice(this.filteredData, this.currentPage, this.itemsPerPage);

    const currentCurrency = AppStore.currentCurrency;

    TableUi.renderData(table, currentPageData, currentCurrency);

    const paginationContainer = document.getElementById('pagination-container');
    if (paginationContainer) {
      paginationContainer.innerHTML = TableUi.renderPagination(this.totalPages, this.currentPage);
    }
  },

  async init() {
    requestAnimationFrame(async () => {
      const table = document.getElementById('all-transactions-table');
      if (!table) return;

      window.addEventListener('transactionAdded', async () => {
        await this.refreshTableData();
      });

      try {
        await AppStore.fetchInitialCurrency();
        await this.refreshTableData();
        this.setupEventListeners();
      } catch (error) {
        console.error("[Table] Initialization error:", error);
        table.innerHTML = `<li class="p-10 text-center text-red-400">Error loading data.</li>`;
      }
    });
  },

  async refreshTableData() {
    const table = document.getElementById('all-transactions-table');
    if (table) {
      table.innerHTML = `<li class="text-center p-10 text-text-secondary animate-pulse">Оновлення даних...</li>`;
    }

    try {
      if (TransactionStore.clear) TransactionStore.clear();

      const newData = await TransactionStore.fetchTransactions();

      this.originalData = newData || [];

      this.applyFilters();
    } catch (error) {
      console.error("[Table] Refresh error:", error);
    }
  },

  setupEventListeners() {
    this.transactionEventListeners();
    this.paginationEventListeners();
    this.searchBarEventListeners();
  },

  searchBarEventListeners() {
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
      searchInput.removeEventListener('input', this.handleSearch);
      searchInput.addEventListener('input', () => {
        this.applyFilters();
      });
    }
  },

  paginationEventListeners() {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer?.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      const action = btn.dataset.action;
      if (action === 'prev' && this.currentPage > 0) this.currentPage--;
      else if (action === 'next' && this.currentPage < this.totalPages - 1) this.currentPage++;
      else if (action === 'page') this.currentPage = parseInt(btn.dataset.page);
      this.updateView();
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.rebuildTable(), 200);
    });
  },

  transactionEventListeners() {
    const table = document.getElementById('all-transactions-table');
    if (!table) return;

    table.addEventListener('click', (e) => {
      const transactionRow = e.target.closest('.transaction');

      if (transactionRow) {
        const transactionId = transactionRow.id;

        const transactionData = this.originalData.find(
          transaction => String(transaction.id) === String(transactionId)
        );

        if (transactionData) {
          const currencySymbol = AppStore.currentCurrency;
          TransactionModal.open(transactionData, currencySymbol);
        }
      }
    });
  },
};

window.updateTransactionFilters = () => {
  if (window.TransactionList) {
    window.TransactionList.applyFilters();
  }
};

window.updateTransactionSort = () => {
  if (window.TransactionList) {
    window.TransactionList.applyFilters();
  }
};

window.TransactionList = TransactionTable;
export default TransactionTable;