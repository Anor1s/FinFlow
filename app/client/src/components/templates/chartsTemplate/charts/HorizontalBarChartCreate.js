import { Chart, ChartsTemplate, getChartStyles } from './index.js';

const categories = ['Housing', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Savings', 'Other', 'Health', 'Savings', 'Other'];
// const Spending = [1200, 400, 300, 200, 150, 100, 500, 200, 100, 500, 200];
const data = [1200, 400, 300, 200, 157, 100, 500, 200, 100, 500, 200];
const Spending = data.sort((a, b) => b - a);

const HorizontalBarChartCreate = {
  chart: null,

  render(chartId) {
    return ChartsTemplate.render(chartId);
  },

  getChartOptions() {
    const styles = getChartStyles();

    return {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 16,
        }
      },
      plugins: {
        // title: {
        //   display: true,
        //   text: 'Spending by Category',
        //   position: 'top',
        //   font: {
        //     family: styles.fontFamily,
        //     size: styles.fontSizeLabel,
        //     weight: 'bold'
        //   },
        //   color: styles.color,
        //
        // },
        legend: {
          display: false,
          // position: 'bottom',
          // align: 'center',
          // labels: {
          //   padding: 0,
          //   boxWidth: 20,
          //   font: {
          //     family: styles.fontFamily,
          //     size: 16
          //   },
          //   color: styles.color
          // }
        },
        tooltip: {
          padding: 12,
          cornerRadius: 8,
          bodyFont: {
            family: styles.fontFamily,
            size: 16
          },
          titleFont: {
            family: styles.fontFamily,
            size: 14,
            weight: 'bold'
          },
          backgroundColor: styles.backgroundColor,
          bodyColor: styles.color,
          borderColor: styles.border,
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((context.parsed.x / total) * 100).toFixed(2);
              return [
                `${context.label}: ${context.parsed.x} (${percentage}%)`
              ];
            },
            title: function(tooltipItems) {
              return 'Category Details:';
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
            font: {
              family: styles.fontFamily,
              size: 14
            },
            color: styles.color,
            callback: function(value) {
              return `${value}`;
            },
          },
        },
        y: {
          grid: {
            color: styles.border,
            drawBorder: false
          },
          ticks: {
            font: {
              family: styles.fontFamily,
              size: 15,
              weight: '500'

            },
            color: styles.color,
            padding: 10,
            mirror: true,
            z: 20,
          }
        }
      },
      barPercentage: 0.7,
      categoryPercentage: 0.8,
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
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
      type: 'bar',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Spending',
            data: Spending,
            backgroundColor: styles.expenseSurface,
            borderColor: styles.expenseBorder,
            borderWidth: 2,
            borderSkipped: false,
            barThickness: 30,
            hoverBorderWidth: 3,
            hoverBorderColor: styles.color
          }
        ]
      },
      options: this.getChartOptions()
    });
  },
};

export default HorizontalBarChartCreate;