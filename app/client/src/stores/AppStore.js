import  AuthService  from '../services/AuthService.js';

export const AppStore = {
  currentCurrency: 'USD',
  isInitialized: false,

  async fetchInitialCurrency() {
    try {
      const response = await AuthService.getProfile();
      const currency = response?.user?.base_currency;

      this.currentCurrency = currency;
      this.isInitialized = true;

    } catch (error) {
      this.isInitialized = true;
    } finally {
      return this.currentCurrency;
    }
  },

  setCurrency(newCurrency) {
    this.currentCurrency = newCurrency;
  }
};

export default AppStore;