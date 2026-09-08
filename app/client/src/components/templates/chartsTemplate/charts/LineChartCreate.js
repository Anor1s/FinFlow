import { Chart, ChartsTemplate, ChartsStyles, getChartStyles, ChartStore, FilterButtonsGetData, AppStore } from '../index.js';

const LineChartCreate = {
  chart: null,
  localData: { labels: [], income: [], expenses: [], savings: [] },

  render(chartId) {
    return ChartsTemplate.render(chartId);
  },

  getChartOptions(isLaptopOrLarger) {
    const styles = getChartStyles();
    const currency = ChartsTemplate.getCurrencySymbol();

    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
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
            size: 20, weight: 'bold'
          },
          footerFont: {
            family: styles.fontFamily,
            size: 16, weight: 'bold'
          },
          borderWidth: 2,
          displayColors: true,
          boxPadding: 6,
          usePointStyle: false,

          callbacks: {
            title: (context) => context[0].label,
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y || 0;
              return `${label}: ${currency}  ${value.toLocaleString('ua-UA', { minimumFractionDigits: 2 })}`;
            },
            afterLabel: (context) => {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;

              if (dataIndex > 0) {
                const prevValue = parseFloat(context.chart.data.datasets[datasetIndex].data[dataIndex - 1]);
                const currentValue = context.parsed.y;

                if (prevValue && prevValue !== 0) {
                  const difference = currentValue - prevValue;
                  const diffPct = ((difference / Math.abs(prevValue)) * 100).toFixed(1);
                  const sign = difference >= 0 ? '↑ +' : '↓ ';
                  return `  Change: ${sign}${diffPct}%`;
                }
              }
              return null;
            }
          },
          xAlign: 'center',
          yAlign: 'top',
          caretPadding: 40,
        }
      },
      scales: {
        x: {
          grid: {
            color: `${styles.color}20`,
            drawBorder: false
          },
          ticks: {
            color: styles.color,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain
            },
            maxRotation: 0,
            padding: 10
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: `${styles.color}20`,
            drawBorder: false
          },
          ticks: {
            color: styles.color,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain
            },
            padding: 10,
            callback: (value) => `${currency} ${value}`
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
          backgroundColor:
          styles.backgroundColor
        }
      }
    };
  },

  async refreshChartData() {
    if (ChartStore.invalidate) ChartStore.invalidate();
    await this.updateChart();
  },

  async updateChart(monthsToShow = null) {
    try {
      if (!this.chart) return;

      const filters = FilterButtonsGetData();
      const params = {
        from: filters.dateTimeFrom?.date || '',
        to: filters.dateTimeTo?.date || ''
      };

      const rawData = await ChartStore.fetchChartsData(params);
      const stats = rawData?.monthlyStats || [];

      const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
      const count = monthsToShow || (isLaptopOrLarger ? 12 : 6);

      const displayData = stats.slice(0, count);

      this.localData.labels = displayData.map(d => d.month);
      this.localData.income = displayData.map(d => d.income);
      this.localData.expenses = displayData.map(d => d.expenses);
      this.localData.savings = displayData.map(d => d.savings);

      this.chart.options = this.getChartOptions(isLaptopOrLarger);
      this.chart.data.labels = this.localData.labels;
      this.chart.data.datasets[0].data = this.localData.income;
      this.chart.data.datasets[1].data = this.localData.expenses;
      this.chart.data.datasets[2].data = this.localData.savings;

      this.chart.update();
    } catch (error) {
      console.error("Update Error:", error);
    }
  },

  lineStyle(styles, type) {
    return {
      data: [],
      borderColor: styles[`${type}Surface`],
      backgroundColor: styles[`${type}Border`],
      pointBackgroundColor: styles[`${type}Surface`],
      pointBorderColor: styles.backgroundColor
    };
  },

  async init(chartId) {
    const ctx = document.getElementById(chartId);
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    const styles = getChartStyles();
    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          { label: 'Income',
            ...this.lineStyle(styles, 'income')
          },
          { label: 'Expenses',
            ...this.lineStyle(styles, 'expense'),
          },
          { label: 'Savings',
            ...this.lineStyle(styles, 'savings')
          }
        ]
      },
      options: this.getChartOptions(isLaptopOrLarger),
    });

    window.LineChartInstance = this;
    window.addEventListener('resize', () => this.handleResize());

    await this.updateChart();
  },

  updateColors() {
    if (!this.chart) return;
    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
    this.chart.options = this.getChartOptions(isLaptopOrLarger);
    this.chart.update();
  },

  handleResize() {
    if (!this.chart) return;
    const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
    const monthsToShow = isLaptopOrLarger ? 12 : 6;
    this.updateChart(monthsToShow);
  }
};

export default LineChartCreate;


