import TransactionService  from '../services/TransactionService.js';

const TransactionStore = {
  data: [],
  isLoaded: false,
  isLoading: false,

  async fetchTransactions() {
    if (this.isLoaded) return this.data;
    if (this.isLoading) return new Promise(resolve => {
      const check = setInterval(() => {
        if (this.isLoaded) {
          clearInterval(check);
          resolve(this.data);
        }
      }, 100);
    });

    this.isLoading = true;
    try {
      this.data = await TransactionService.getAll();
      this.isLoaded = true;
      return this.data;
    } catch (err) {
      console.error("Store error:", err);
      throw err;
    } finally {
      this.isLoading = false;
    }
  },

  getData() {
    return this.data;
  },

  clear() {
    this.data = [];
    this.isLoaded = false;
  }
};

export default TransactionStore;