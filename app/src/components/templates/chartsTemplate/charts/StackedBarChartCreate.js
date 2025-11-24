import { Chart, ChartsTemplate, getChartStyles } from './index.js';

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const allIncome = [1200, 1900, 1500, 1800, 2200, 2000, 2400, 2100, 2300, 2500, 2200, 2800];
const allExpenses = [800, 1200, 1000, 1100, 1400, 1300, 1500, 1200, 1400, 1600, 1300, 1700];
const allSavings = [500, 100, 300, 600, 1400, 1300, 200, 1200, 1400, 1000, 800, 1100];

const StackedBarChartCreate = {
  chart: null,
  chartWidth: 0,

  render(chartId) {
    return ChartsTemplate.render(chartId);
  },

  createBackgroundPlugin() {
    return {
      afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        const yAxis = chart.scales.y;
        const styles = getChartStyles();

        chart.data.datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);

          meta.data.forEach((datapoint) => {
            const x = datapoint.x;
            const width = datapoint.width;

            const yTop = yAxis.getPixelForValue(0);
            const yBottom = yAxis.getPixelForValue(chart.scales.y.max);

            ctx.fillStyle = `${styles.color}15`;
            ctx.fillRect(x - width / 2, yTop, width, yBottom - yTop);

            ctx.strokeStyle = `${styles.border}30`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x - width / 2, yTop, width, yBottom - yTop);
          });
        });
      }
    };
  },

  // Нова функція для визначення кількості місяців на основі ширини
  getMonthsToShow(width) {
    if (width >= 380) {
      return 12;
    } else if (width >= 300) {
      return 9;
    } else {
      return 6;
    }
  },

  getChartOptions(isLaptopOrLarger) {
    const styles = getChartStyles();

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      layout: {},
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
          enabled: true,
          padding: 16,
          caretSize: 8,
          cornerRadius: 8,
          bodyFont: {
            family: styles.fontFamily,
            size: 16,
            weight: 'normal'
          },
          titleFont: {
            family: styles.fontFamily,
            size: 20,
            weight: 'bold'
          },
          backgroundColor: styles.backgroundColor,
          bodyColor: styles.color,
          borderColor: styles.border,
          borderWidth: 2,
          displayColors: true,
          usePointStyle: true,
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              return '';
            },
            afterBody: function(context) {
              const tooltipContext = context[0];
              const dataIndex = tooltipContext.dataIndex;
              const chart = tooltipContext.chart;
              const datasets = chart.data.datasets;

              let total = 0;
              const values = [];

              datasets.forEach((dataset, index) => {
                const value = dataset.data[dataIndex];
                if (typeof value === 'number') {
                  total += value;
                  values.push({
                    label: dataset.label,
                    value: value,
                    datasetIndex: index
                  });
                }
              });

              const lines = values.map(item => {
                const percentage = total > 0 ? ((item.value / total) * 100).toFixed(2) : 0;
                return `${item.label}: ${item.value} (${percentage}%)`;
              });

              lines.push(`Total: ${total}`);
              return lines;
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
          stacked: true,
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
          stacked: true,
          beginAtZero: true,
          grid: {
            color: `${styles.color}30`,
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

    const container = ctx.parentElement;
    if (!container) return;

    // Отримуємо поточну ширину контейнера
    const containerWidth = container.clientWidth;
    this.chartWidth = containerWidth;

    // Визначаємо кількість місяців на основі ширини
    const monthsToShow = this.getMonthsToShow(containerWidth);

    const displayMonths = allMonths.slice(0, monthsToShow);
    const displayIncome = allIncome.slice(0, monthsToShow);
    const displayExpenses = allExpenses.slice(0, monthsToShow);
    const displaySavings = allSavings.slice(0, monthsToShow);

    if (this.chart) {
      this.updateChart(monthsToShow);
      return;
    }

    const styles = getChartStyles();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: displayMonths,
        datasets: [
          {
            label: 'Income',
            data: displayIncome,
            backgroundColor: styles.incomeSurface,
            borderColor: styles.incomeBorder,
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverBorderColor: styles.color
          },
          {
            label: 'Expenses',
            data: displayExpenses,
            backgroundColor: styles.expenseSurface,
            borderColor: styles.expenseBorder,
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverBorderColor: styles.color
          },
          {
            label: 'Savings',
            data: displaySavings,
            backgroundColor: styles.savingsSurface,
            borderColor: styles.savingsBorder,
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverBorderColor: styles.color
          }
        ]
      },
      options: this.getChartOptions(containerWidth >= 500),
      plugins: [this.createBackgroundPlugin()]
    });


    this.setupResizeObserver(container, chartId);
  },

  setupResizeObserver(container, chartId) {
    // Перевіряємо підтримку ResizeObserver
    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newWidth = entry.contentRect.width;

          // Оновлюємо лише якщо ширина змінилася значно (понад 10px)
          if (Math.abs(newWidth - this.chartWidth) > 10) {
            this.chartWidth = newWidth;
            const monthsToShow = this.getMonthsToShow(newWidth);
            this.updateChart(monthsToShow);
          }
        }
      });

      resizeObserver.observe(container);
    } else {
      // Fallback для старих браузерів
      window.addEventListener('resize', () => {
        const container = document.getElementById(chartId)?.parentElement;
        if (!container) return;

        const newWidth = container.clientWidth;
        if (Math.abs(newWidth - this.chartWidth) > 10) {
          this.chartWidth = newWidth;
          const monthsToShow = this.getMonthsToShow(newWidth);
          this.updateChart(monthsToShow);
        }
      });
    }
  },

  updateChart(monthsToShow = null) {
    if (!this.chart) return;

    // Якщо monthsToShow не передано, визначаємо на основі поточної ширини
    if (monthsToShow === null) {
      monthsToShow = this.getMonthsToShow(this.chartWidth);
    }

    this.chart.data.labels = allMonths.slice(0, monthsToShow);
    this.chart.data.datasets[0].data = allIncome.slice(0, monthsToShow);
    this.chart.data.datasets[1].data = allExpenses.slice(0, monthsToShow);
    this.chart.data.datasets[2].data = allSavings.slice(0, monthsToShow);

    const isWide = this.chartWidth >= 500;
    this.chart.options = this.getChartOptions(isWide);
    this.chart.update();
  },

  updateColors() {
    if (!this.chart) return;

    const isWide = this.chartWidth >= 500;
    this.chart.options = this.getChartOptions(isWide);
    this.chart.update();
  },

  handleResize() {
    // Ця функція тепер використовує ResizeObserver
    // Залишаємо для зворотної сумісності
    const container = this.chart?.canvas?.parentElement;
    if (container) {
      const newWidth = container.clientWidth;
      if (Math.abs(newWidth - this.chartWidth) > 10) {
        this.chartWidth = newWidth;
        const monthsToShow = this.getMonthsToShow(newWidth);
        this.updateChart(monthsToShow);
      }
    }
  }
};

export default StackedBarChartCreate;