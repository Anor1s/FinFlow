import TransactionService  from '../services/TransactionService.js';

const TransactionStore = {
  cache: {},
  lastRequestKey: null,

  async fetchTransactions(page, limit) {
    const cacheKey = `${page}-${limit}`;
    this.lastRequestKey = cacheKey;

    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    try {
      const response = await TransactionService.getAll(page, limit);

      if (this.lastRequestKey !== cacheKey) {
        return null;
      }

      this.cache[cacheKey] = response;
      return response;
    } catch (err) {
      console.error("Store error:", err);
      throw err;
    }
  },

  clearCache() {
    this.cache = {};
    this.lastRequestKey = null;
  }
};


export default TransactionStore;