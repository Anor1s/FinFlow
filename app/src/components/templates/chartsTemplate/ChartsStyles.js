function getProperty(property) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();

  return property.includes('breakpoint') ? value : value.replace('px', '');
}

function getChartStyles() {
  return {
    color: getProperty('--color-text-tertiary'),
    fontSizeLabel: getProperty('--text-xl'),
    fontSizeMain: getProperty('--text-base'),
    backgroundColor: getProperty('--color-background'),
    border: getProperty('--color-surface'),
    laptopBreakpoint: getProperty('--breakpoint-laptop'),
    chartsBreakpoint: getProperty('--breakpoint-chart'),
    fontFamily: getProperty('--font-family-primary'),

    incomeSurface: getProperty('--color-chart-income-surface'),
    incomeBorder: getProperty('--color-chart-income-border'),
    expenseSurface: getProperty('--color-chart-expense-surface'),
    expenseBorder: getProperty('--color-chart-expense-border'),
    savingsSurface: getProperty('--color-chart-savings-surface'),
    savingsBorder: getProperty('--color-chart-savings-border'),
  };
}

const ChartStyles = getChartStyles();

export { getChartStyles };
export default ChartStyles;