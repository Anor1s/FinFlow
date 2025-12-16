import { Chart, ChartsTemplate, getChartStyles } from './index.js';

const biggestSpending = ['Housing', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Savings', 'Other'];
const spendingValues = [300, 50, 100, 100, 100, 100, 100, 50];

const PieChartCreate = {
  chart: null,

  render(chartId) {
    return ChartsTemplate.render(chartId);
  },

  getChartOptions() {
    const styles = getChartStyles();

    return {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '40%',
      layout: {},
      plugins: {
        // title: {
        //   display: true,
        //   text: 'Budget Distribution',
        //   position: 'top',
        //   font: {
        //     family: styles.fontFamily,
        //     size: styles.fontSizeLabel,
        //     weight: 'bold'
        //   },
        //   color: styles.color,
        // },
        legend: {
          position: 'bottom',
          title: {
            display: true,
          },
          labels: {
            padding: 10,
            boxWidth: 16,
            font: {
              family: styles.fontFamily,
              size: styles.fontSizeMain
            },
            color: styles.color
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
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed / total) * 100).toFixed(2);
              return `${context.label}: ${context.parsed} (${percentage}%)`;
            }
          },
          xAlign: 'center',
          yAlign: 'top',
          caretPadding: 20,
          position: 'nearest',
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

      const styles = getChartStyles();

      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: biggestSpending,
          datasets: [{
            data: spendingValues,
            backgroundColor: [
              '#FF8FA3', '#6EC6FF', '#FFD966', '#66CFC7',
              '#B399FF', '#FFB366', '#FF6B6B', '#9EE86F'
            ],
            borderColor: 'transparent',
            borderWidth: 2,
            hoverOffset: 30,
            hoverBorderColor: styles.color,
          }]
        },
        options: this.getChartOptions(),
      });
  },

  updateColors() {
    if (!this.chart) return;

    const styles = getChartStyles();
    this.chart.data.datasets[0].hoverBorderColor = styles.color;

    this.chart.options = this.getChartOptions();
    this.chart.update();
  }
};

export default PieChartCreate;