import ChartService from '../services/ChartService.js';
import  AppStore  from './AppStore.js';

const ChartStore = {
  data: null,
  isLoaded: false,
  lastFilters: null,

  async fetchChartsData(filters = {}) {
    const { from = '', to = '' } = filters;
    const currency = AppStore.currentCurrency;

    const cacheKey = `${from}-${to}-${currency}`;

    if (this.isLoaded && this.lastFilters === cacheKey) {
      return this.data;
    }

    try {
      const response = await ChartService.getSummary(from, to);
      this.data = response;
      this.lastFilters = cacheKey;
      this.isLoaded = true;
      return this.data;
    } catch (err) {
      return { monthlyStats: [], categoryStats: [] };
    }
  },

  invalidate() {
    this.isLoaded = false;
    this.lastFilters = null;
    this.data = null;
  }
};

export default ChartStore;