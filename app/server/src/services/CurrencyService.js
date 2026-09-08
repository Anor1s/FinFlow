
const CurrencyService = {
  async getExchangeRate(from, to) {
    if (from === to) return 1;

    try {
      // Free to use key
      const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);

      if (!response.ok) {
        throw new Error(`Currency API responded with status: ${response.status}`);
      }

      const data = await response.json();
      const rate = data.rates[to];

      if (!rate) {
        console.warn(`Rate for ${to} not found in API response, using 1.0`);
        return 1;
      }

      return rate;
    } catch (error) {
      console.error('CURRENCY_FETCH_ERROR:', error.message);

      return 1;
    }
  }
};

module.exports = CurrencyService;