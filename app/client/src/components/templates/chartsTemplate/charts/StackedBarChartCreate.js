import { Chart, ChartsTemplate, getChartStyles, ChartStore, FilterButtonsGetData, AppStore } from '../index.js';

const StackedBarChartCreate = {
  chart: null,
  chartWidth: 0,
  localData: { labels: [], income: [], expenses: [], savings: [] },

  render(chartId) {
    return ChartsTemplate.render(chartId);
  },

  createBackgroundPlugin() {
    return {
      id: 'customBarBackground',
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

  getMonthsToShow(width) {
    if (width >= 380) return 12;
    if (width >= 300) return 9;
    return 6;
  },

  getChartOptions() {
    const styles = getChartStyles();
    const currency = ChartsTemplate.getCurrencySymbol();

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 16,
            boxWidth: 16,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain
            },
            color: styles.color,
          },
        },
        tooltip: {
          enabled: true,
          padding: 16,
          backgroundColor: styles.backgroundColor,
          titleColor: styles.color,
          bodyColor: styles.color,
          footerColor: styles.color,
          borderColor: styles.border,
          bodyFont: {
            family: styles.fontFamily,
            size: 16
          },
          titleFont: {
            family: styles.fontFamily,
            size: 20,
            weight: 'bold'
          },
          footerFont: {
            family: styles.fontFamily,
            size: 16,
            weight: 'bold'
          },
          borderWidth: 2,
          displayColors: true,
          boxPadding: 6,
          usePointStyle: false,

          callbacks: {
            title: (context) => context[0].label,
            label: (context) => {
              const dataIndex = context.dataIndex;
              const chart = context.chart;
              const datasets = chart.data.datasets;
              const currency = ChartsTemplate.getCurrencySymbol();

              let totalSum = 0;
              datasets.forEach(ds => {
                totalSum += parseFloat(ds.data[dataIndex]) || 0;
              });

              const value = parseFloat(context.parsed.y) || 0;
              const label = context.dataset.label || '';

              const percentage = totalSum > 0
                ? ((value / totalSum) * 100).toFixed(1)
                : "0.0";

              return `${label}: ${currency} ${value.toLocaleString('ua-UA', { minimumFractionDigits: 2 })} (${percentage}%)`;
            },
            footer: (context) => {
              const dataIndex = context[0].dataIndex;
              const datasets = context[0].chart.data.datasets;
              const currency = ChartsTemplate.getCurrencySymbol();

              let totalSum = 0;
              datasets.forEach(ds => {
                totalSum += parseFloat(ds.data[dataIndex]) || 0;
              });

              return `\nTotal: ${totalSum.toLocaleString('ua-UA', { minimumFractionDigits: 2 })} ${currency}`;
            }
          }
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
              size: styles.fontSizeMain
            }
          }
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: {
            color: `${styles.color}30`
          },
          ticks: {
            color: styles.color,
            font: { family: styles.fontFamily, size: styles.fontSizeMain },
            callback: (value) => `${currency} ${value}`
          }
        }
      },
    };
  },

  async refreshChartData() {
    await this.updateChart(true);
  },

  async updateChart(forceRefresh = false) {
    await ChartsTemplate.fetchAndRefresh(this, forceRefresh, (rawData) => {
      const stats = rawData?.monthlyStats || [];

      const monthsToShow = this.getMonthsToShow(this.chartWidth);
      const displayData = stats.slice(0, monthsToShow);

      return {
        labels: displayData.map(d => d.month),
        datasets: [
          displayData.map(d => d.income),
          displayData.map(d => d.expenses),
          displayData.map(d => d.savings)
        ]
      };
    });
  },


  barStyle(styles, type) {
    return {
      data: [],
      borderColor: styles[`${type}Border`],
      backgroundColor: styles[`${type}Surface`],
      borderWidth: 2,
      hoverBorderColor: styles.color
    };
  },

  async init(chartId) {
    const ctx = document.getElementById(chartId);
    if (!ctx) return;

    const container = ctx.parentElement;
    this.chartWidth = container?.clientWidth || 0;

    if (this.chart) {
      this.chart.destroy();
    }

    const styles = getChartStyles();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Income',
            ...this.barStyle(styles, 'income'),
          },
          {
            label: 'Expenses',
            ...this.barStyle(styles, 'expense'),
          },
          {
            label: 'Savings',
            ...this.barStyle(styles, 'savings'),
          }
        ]
      },
      options: this.getChartOptions(),
      plugins: [this.createBackgroundPlugin()]
    });

    ChartsTemplate.subscribeRefresh(() => this.updateChart(true));

    this.setupResizeObserver(container);
    window.StackedBarChartInstance = this;

    await this.updateChart();
  },

  setupResizeObserver(container) {
    if (!container) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;

        if (Math.abs(newWidth - this.chartWidth) > 10) {
          this.chartWidth = newWidth;
          this.updateChart();
        }
      }
    });
    resizeObserver.observe(container);
  },

  updateColors() {
    if (!this.chart) return;
    this.chart.options = this.getChartOptions();
    this.chart.update();
  }
};

export default StackedBarChartCreate;