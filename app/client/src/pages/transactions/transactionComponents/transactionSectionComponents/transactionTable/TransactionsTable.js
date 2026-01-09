import {
  FilterButtonsGetData, SortByButtonsGetData, SearchBar,
  TransactionStore, TableUi, TableLogic, TablePagination, AppStore,
  TransactionModal
} from '../../../index.js';

const TransactionTable = {
  currentPage: 1,
  itemsPerPage: 0,
  totalPages: 0,
  data: [],

  render() {
    return TableUi.renderMainLayout();
  },

  applyFilters() {
    this.refreshTableData();
  },

  async rebuildTable() {
    const table = document.getElementById('all-transactions-table');
    if (!table) return;

    const newItemsPerPage = TablePagination.calculateItemsPerPage(table);

    if (newItemsPerPage !== this.itemsPerPage && newItemsPerPage > 0) {
      this.itemsPerPage = newItemsPerPage;
      await this.loadPage(this.currentPage);
    }
  },

  updateView() {
    const table = document.getElementById('all-transactions-table');
    if (!table) return;

    const currentCurrency = AppStore.currentCurrency;
    TableUi.renderData(table, this.data, currentCurrency);

    const paginationContainer = document.getElementById('pagination-container');
    if (paginationContainer) {
      paginationContainer.innerHTML = TableUi.renderPagination(this.totalPages, this.currentPage - 1);
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
        this.itemsPerPage = TablePagination.calculateItemsPerPage(table);
        await this.loadPage(1);
        this.setupEventListeners();
      } catch (error) {
        console.error("[Table] Init error:", error);
        table.innerHTML = `<li class="p-10 text-center text-red-400">Error loading data.</li>`;
      }
    });
  },

  async loadPage(page) {
    this.currentPage = page;
    const table = document.getElementById('all-transactions-table');

    if (table) {
      table.innerHTML = `<li class="text-center p-10 text-text-secondary animate-pulse">Завантаження...</li>`;
    }

    try {
      const response = await TransactionStore.fetchTransactions(this.currentPage, this.itemsPerPage);

      if (response) {
        this.data = response.transactions;
        this.totalPages = response.pagination.totalPages;
        this.updateView();
      }
    } catch (error) {
      console.error("[Table] Load error:", error);
    }
  },

  async refreshTableData() {
    if (TransactionStore.clearCache) {
      TransactionStore.clearCache();
    }
    await this.loadPage(1);
  },

  setupEventListeners() {
    this.transactionEventListeners();
    this.paginationEventListeners();
    this.searchBarEventListeners();
  },

  searchBarEventListeners() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        this.applyFilters();
      });
    }
  },

  paginationEventListeners() {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer?.addEventListener('click', async (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const action = btn.dataset.action;
      let targetPage = this.currentPage;

      if (action === 'prev' && this.currentPage > 1) targetPage--;
      else if (action === 'next' && this.currentPage < this.totalPages) targetPage++;
      else if (action === 'page') targetPage = parseInt(btn.dataset.page) + 1;

      if (targetPage !== this.currentPage) {
        await this.loadPage(targetPage);
      }
    });

    window.addEventListener("resize", () => {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => this.rebuildTable(), 200);
    });
  },

  transactionEventListeners() {
    const table = document.getElementById('all-transactions-table');
    if (!table) return;

    table.addEventListener('click', (e) => {
      const transactionRow = e.target.closest('.transaction');

      if (transactionRow) {
        const transactionId = transactionRow.id;
        const transactionData = this.data.find(
          t => String(t.id) === String(transactionId)
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