import { Chart, ChartsTemplate, ChartsStyles, getChartStyles } from './index.js';

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const allIncome = [1200, 1900, 1500, 1800, 2200, 2000, 2400, 2100, 2300, 2500, 2200, 2800];
const allExpenses = [800, 1200, 1000, 1100, 1400, 1300, 1500, 1200, 1400, 1600, 1300, 1700];
const allSavings = [500, 100, 300, 600, 1400, 1300, 200, 1200, 1400, 1000, 800, 1100];

const BarChartCreate = {
  chart: null,

  render(chartId) {
    return ChartsTemplate.render(chartId);
  },

  createBackgroundPlugin(displayIncome, displayExpenses) {
    return {
      id: 'customCanvasBackgroundColor3',
      afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        const yAxis = chart.scales.y;
        const styles = getChartStyles();

        const maxValue = Math.max(...displayIncome, ...displayExpenses);

        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);

          meta.data.forEach((datapoint) => {
            const x = datapoint.x;
            const width = datapoint.width / 1.5;

            const yTop = yAxis.getPixelForValue(maxValue);
            const yBottom = yAxis.getPixelForValue(0);

            ctx.fillStyle = `${styles.color}30`;
            ctx.fillRect(x - width / 2, yTop, width, yBottom - yTop);

            ctx.strokeStyle = `${styles.border}50`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x - width / 2, yTop, width, yBottom - yTop);
          });
        });
      }
    };
  },

  getChartOptions(isLaptopOrLarger) {
    const styles = getChartStyles();

    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {},
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          align: 'center',
          fullSize: true,
          labels: {
            padding: isLaptopOrLarger ? 20 : 15,
            boxWidth: isLaptopOrLarger ? 20 : 16,
            boxHeight: isLaptopOrLarger ? 20 : 16,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain,
            },
            color: styles.color,
          },
        },
        tooltip: {
          padding: 16,
          caretSize: 8,
          cornerRadius: 8,
          bodyFont: {
            family: styles.fontFamily,
            size: 20,
            weight: 'bold'
          },
          titleFont: {
            family: styles.fontFamily,
            size: 20,
            weight: 'normal'
          },
          backgroundColor: styles.backgroundColor,
          bodyColor: styles.color,
          borderColor: styles.border,
          borderWidth: 1,
          callbacks: {
            title: function() {
              return '';
            },
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            }
          },
          xAlign: 'center',
          yAlign: 'bottom',
          position: 'nearest',
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: styles.color,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain,
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: `${styles.color}50`,
          },
          ticks: {
            color: styles.color,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain,
            },
            callback: function(value) {
              return value;
            }
          }
        }
      },
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

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: displayMonths,
        datasets: [
          {
            label: 'Income',
            data: displayIncome,
            backgroundColor: 'green',
            borderColor: 'transparent',
            borderWidth: 1,
          },
          {
            label: 'Expenses',
            data: displayExpenses,
            backgroundColor: 'red',
            borderColor: 'transparent',
            borderWidth: 1,
          },
          {
            label: 'Savings',
            data: displaySavings,
            backgroundColor: 'purple',
            borderColor: 'transparent',
            borderWidth: 1,
          },
        ]
      },
      options: this.getChartOptions(isLaptopOrLarger),
      plugins: [this.createBackgroundPlugin(displayIncome, displayExpenses, displaySavings)]
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

    // Просто оновлюємо всі опції з новими стилями
    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
    this.chart.options = this.getChartOptions(isLaptopOrLarger);
    this.chart.update();
  },

  handleResize() {
    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
    const monthsToShow = isLaptopOrLarger ? 12 : 6;
    this.updateChart(monthsToShow);
  },
};

export default BarChartCreate;

