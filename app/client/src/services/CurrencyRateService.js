const CURRENCY_API_URL = import.meta.env.VITE_CURRENCY_API_URL

export const CurrencyRateService = {
  async getExchangeRate(from, to) {
    if (from === to) return 1;

    try {
      const response = await fetch(`${CURRENCY_API_URL}/${from}`);

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

export default CurrencyRateService;