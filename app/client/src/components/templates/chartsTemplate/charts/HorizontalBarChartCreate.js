import { Chart, ChartsTemplate, getChartStyles, ChartStore, FilterButtonsGetData, AppStore } from '../index.js';

const HorizontalBarChartCreate = {
  chart: null,
  localData: {
    labels: [],
    values: []
  },

  render(chartId) { return ChartsTemplate.render(chartId); },

  getChartOptions() {
    const styles = getChartStyles();
    const currency = ChartsTemplate.getCurrencySymbol();

    return {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 16
        }
      },
      plugins: {
        legend: {
          display: false
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
            title: (context) => {
              return `${context[0].label}`;
            },

            label: (context) => {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const value = context.parsed.x;
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;

              const formattedValue = value.toLocaleString('ua-UA', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              });

              return `${currency} ${formattedValue} (${percentage}%)`;
            }
          }
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: styles.border,
            drawBorder: false
          },
          ticks: {
            color: styles.color,
            callback: (v) => `${v}${currency}` }
          },
        y: {
          grid: {
            color: styles.border,
            drawBorder: false
          },
          ticks: {
            color: styles.color,
            font: {
              weight: '600',
              size: 16
            },
            padding: 10,
            mirror: true,
            z: 20
          }
        }
      },
      barPercentage: 0.7, categoryPercentage: 0.8,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    };
  },

  async updateChart(forceRefresh = false) {
    await ChartsTemplate.fetchAndRefresh(this, forceRefresh, (rawData) => {
      let categories = [...(rawData?.categoryStats || [])];
      categories.sort((a, b) => b.amount - a.amount);
      return {
        labels: categories.map(item => (item.category || 'Other').charAt(0).toUpperCase() + (item.category || 'Other').slice(1).toLowerCase()),
        values: categories.map(item => parseFloat(item.amount) || 0)
      };
    });
  },

  async init(chartId) {
    const ctx = document.getElementById(chartId);
    if (!ctx) return;
    if (this.chart) this.chart.destroy();
    const styles = getChartStyles();
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Spending',
          data: [],
          backgroundColor: styles.expenseSurface,
          borderColor: styles.expenseBorder,
          borderWidth: 2,
          borderSkipped: false,
          barThickness: 40,
          hoverBorderWidth: 3,
          hoverBorderColor: styles.color
        }]
      },
      options: this.getChartOptions()
    });
    ChartsTemplate.subscribeRefresh(() => this.updateChart(true));
    await this.updateChart();
  },

  async refreshChartData() { await this.updateChart(true); }
};
export default HorizontalBarChartCreate;