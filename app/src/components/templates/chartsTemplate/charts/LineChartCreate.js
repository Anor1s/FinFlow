import { Chart, ChartsTemplate, ChartsStyles, getChartStyles } from './index.js';

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const allIncome = [1200, 1900, 1500, 1800, 2200, 2000, 2400, 2100, 2300, 2500, 2200, 2800];
const allExpenses = [800, 1200, 1000, 1100, 1400, 1300, 1500, 1200, 1400, 1600, 1300, 1700];
const allSavings = [300, 500, 450, 600, 750, 600, 800, 900, 850, 1000, 900, 950];

const LineChartCreate = {
  chart: null,

  render(chartId) {
    return ChartsTemplate.render(chartId);
  },

  getChartOptions(isLaptopOrLarger) {
    const styles = getChartStyles();

    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {

      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          align: 'center',
          fullSize: true,
          labels: {
            padding: 16,
            boxWidth: 16,
            boxHeight: 16,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain,
            },
            color: styles.color,
          },
        },
        tooltip: {
          mode: 'nearest',
          intersect: true,
          padding: 16,
          caretSize: 8,
          cornerRadius: 8,
          bodyFont: {
            family: styles.fontFamily,
            size: 16,
            weight: 'normal',
          },
          titleFont: {
            family: styles.fontFamily,
            size: 20,
            weight: 'bold'
          },
          backgroundColor: styles.backgroundColor,
          bodyColor: styles.color,
          borderColor: styles.border,
          borderWidth: 1,
          callbacks: {
            title: function(tooltipItems) {
              if (tooltipItems.length > 0) {
                return tooltipItems[0].label;
              }
              return '';
            },
            label: function(context) {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${value}`;
            },
            afterLabel: function(context) {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;

              if (dataIndex > 0) {
                const prevValue = context.chart.data.datasets[datasetIndex].data[dataIndex - 1];
                const currentValue = context.parsed.y;
                const difference = currentValue - prevValue;

                if (prevValue !== 0) {
                  const differencePercentage = ((difference / prevValue) * 100).toFixed(2);
                  const sign = difference >= 0 ? '+' : '';

                  return `Change: ${sign}${differencePercentage}%`;
                }
              }
              return '';
            }
          },
          xAlign: 'center',
          yAlign: 'top',
          caretPadding: 40, 
          position: 'nearest',
        }
      },
      scales: {
        x: {
          grid: {
            color: `${styles.color}20`,
            drawBorder: false,
          },
          ticks: {
            color: styles.color,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain,
            },
            maxRotation: 0,
            padding: 10
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: `${styles.color}20`,
            drawBorder: false,
          },
          ticks: {
            color: styles.color,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain,
            },
            padding: 10,
            callback: function(value) {
              return value;
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 3,
          fill: false
        },
        point: {
          radius: 5,
          hoverRadius: 8,
          borderWidth: 2,
          backgroundColor: styles.backgroundColor
        }
      }
    };
  },

  init(chartId) {
    const ctx = document.getElementById(chartId);
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
    const monthsToShow = isLaptopOrLarger ? 12 : 6;

    const displayMonths = allMonths.slice(0, monthsToShow);
    const displayIncome = allIncome.slice(0, monthsToShow);
    const displayExpenses = allExpenses.slice(0, monthsToShow);
    const displaySavings = allSavings.slice(0, monthsToShow);

    if (this.chart) {
      this.updateChart(monthsToShow);
      return;
    }

    const styles = getChartStyles(); // Додаємо тут отримання стилів

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: displayMonths,
        datasets: [
          {
            label: 'Income',
            data: displayIncome,
            borderColor: styles.incomeSurface,
            backgroundColor: styles.incomeBorder,
            pointBackgroundColor: styles.incomeSurface,
            pointBorderColor: styles.backgroundColor,
            pointHoverBackgroundColor: styles.backgroundColor,
            pointHoverBorderColor: styles.incomeSurface,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
          {
            label: 'Expenses',
            data: displayExpenses,
            borderColor: styles.expenseSurface,
            backgroundColor: styles.expenseBorder,
            pointBackgroundColor: styles.expenseSurface,
            pointBorderColor: styles.backgroundColor,
            pointHoverBackgroundColor: styles.backgroundColor,
            pointHoverBorderColor: styles.expenseSurface,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
          },
          {
            label: 'Savings',
            data: displaySavings,
            borderColor: styles.savingsSurface,
            backgroundColor: styles.savingsBorder,
            pointBackgroundColor: styles.savingsSurface,
            pointBorderColor: styles.backgroundColor,
            pointHoverBackgroundColor: styles.backgroundColor,
            pointHoverBorderColor: styles.savingsSurface,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 8,
          }
        ]
      },
      options: this.getChartOptions(isLaptopOrLarger),

    });
    window.addEventListener('resize', () => this.handleResize());
  },

  updateChart(monthsToShow = null) {
    if (!this.chart) return;

    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
    const months = monthsToShow || (isLaptopOrLarger ? 12 : 6);

    this.chart.data.labels = allMonths.slice(0, months);
    this.chart.data.datasets[0].data = allIncome.slice(0, months);
    this.chart.data.datasets[1].data = allExpenses.slice(0, months);
    this.chart.data.datasets[2].data = allSavings.slice(0, months);

    this.chart.options = this.getChartOptions(isLaptopOrLarger);
    this.chart.update();
  },

  updateColors() {
    if (!this.chart) return;

    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
    this.chart.options = this.getChartOptions(isLaptopOrLarger);
    this.chart.update();
  },

  handleResize() {
    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
    const monthsToShow = isLaptopOrLarger ? 12 : 6;
    this.updateChart(monthsToShow);
  }
};

export default LineChartCreate;