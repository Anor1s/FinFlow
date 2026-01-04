const BASE = import.meta.env.BASE_URL;
const iconsPath = `${BASE}/assets/icons/overviewCards`;

const ItemsData = {
  getCurrencySymbol(code) {
    const symbols = { 'USD': '$', 'UAH': '₴', 'EUR': '€' };
    return symbols[code] || code;
  },

  formatDashboardItems(summary) {
    if (!summary) return [];

    const symbol = this.getCurrencySymbol(summary.currency);

    return [
      {
        icon: `${iconsPath}/Balance.svg`,
        heading: 'Balance',
        currency: symbol,
        value: summary.balance,
      },
      {
        icon: `${iconsPath}/Income.svg`,
        heading: 'Income',
        currency: symbol,
        value: summary.totalIncome,
      },
      {
        icon: `${iconsPath}/Spending.svg`,
        heading: 'Spending',
        currency: symbol,
        value: summary.totalSpending,
      },
      {
        icon: `${iconsPath}/Savings.svg`,
        heading: 'Savings',
        currency: symbol,
        value: summary.totalSavings,
      },
      {
        icon: `${iconsPath}/Transactions.svg`,
        heading: 'Transactions count',
        currency: '№',
        value: summary.transactionsCount,
      },
    ];
  }
};

export default ItemsData;