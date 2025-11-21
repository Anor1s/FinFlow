import { Chart, ChartsTemplate, ChartsStyles } from '../index.js';

const chartId = 'monthlyChart';

const MonthlyComparisonChart = {
  render() {
    return `
      ${ChartsTemplate.render(chartId)}
    `;
  },

  init() {
    setTimeout(() => {
      const ctx = document.getElementById(chartId);
      if (!ctx) return;

      const isLaptopOrLarger = window.matchMedia(`(min-width: ${ChartsStyles.chartsBreakpoint})`).matches;
      const monthsToShow = isLaptopOrLarger ? 12 : 6;

      const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const allIncome = [1200, 1900, 1500, 1800, 2200, 2000, 2400, 2100, 2300, 2500, 2200, 2800];
      const allExpenses = [800, 1200, 1000, 1100, 1400, 1300, 1500, 1200, 1400, 1600, 1300, 1700];

      const displayMonths = allMonths.slice(0, monthsToShow);
      const displayIncome = allIncome.slice(0, monthsToShow);
      const displayExpenses = allExpenses.slice(0, monthsToShow);

      const backgroundPlugin = {
        id: 'customCanvasBackgroundColor',
        afterDatasetsDraw(chart) {
          const ctx = chart.ctx;
          const yAxis = chart.scales.y;
          const xAxis = chart.scales.x;

          const maxValue = Math.max(...displayIncome, ...displayExpenses);

          chart.data.datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex);

            meta.data.forEach((datapoint, index) => {
              const x = datapoint.x;
              const width = datapoint.width / 1.5;

              const yTop = yAxis.getPixelForValue(maxValue);
              const yBottom = yAxis.getPixelForValue(0);

              ctx.fillStyle = `${ChartsStyles.color}30`;
              ctx.fillRect(
                x - width / 2,
                yTop,
                width,
                yBottom - yTop
              );

              ctx.strokeStyle = `${ChartsStyles.border}50`;
              ctx.lineWidth = 1;
              ctx.strokeRect(
                x - width / 2,
                yTop,
                width,
                yBottom - yTop
              );
            });
          });
        }
      };

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: displayMonths,
          datasets: [
            {
              label: 'Income',
              data: displayIncome,
              backgroundColor: '#6EC6FF',
              borderColor: 'transparent',
              borderWidth: 1,
            },
            {
              label: 'Expenses',
              data: displayExpenses,
              backgroundColor: '#FF8FA3',
              borderColor: 'transparent',
              borderWidth: 1,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {},
          plugins: {
            title: {
              display: true,
              text: 'Income & Expenses',
              position: 'top',
              font: {
                family: `${ChartsStyles.fontFamily}`,
                size: `${ChartsStyles.fontSizeLabel}`,
                weight: 'bold'
              },
              color: `${ChartsStyles.color}`,
            },
            legend: {
              display: isLaptopOrLarger,
              position: 'bottom',
              labels: {
                padding: 10,
                boxWidth: 20,
                font: {
                  family: `${ChartsStyles.fontFamily}`,
                  size: `${ChartsStyles.fontSizeMain}`
                },
                color: `${ChartsStyles.color}`,
              },
            },
            tooltip: {
              padding: 16,
              caretSize: 8,
              cornerRadius: 8,
              bodyFont: {
                family: `${ChartsStyles.fontFamily}`,
                size: 20,
                weight: 'bold'
              },
              titleFont: {
                family: `${ChartsStyles.fontFamily}`,
                size: 20,
                weight: 'normal'
              },
              backgroundColor: `${ChartsStyles.backgroundColor}`,
              bodyColor: `${ChartsStyles.color}`,
              borderColor: `${ChartsStyles.border}`,
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
                color: `${ChartsStyles.color}`,
                font: {
                  family: `${ChartsStyles.fontFamily}`,
                  size: `${ChartsStyles.fontSizeMain}`,
                }
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: `${ChartsStyles.color}50`,
              },
              ticks: {
                color: `${ChartsStyles.color}`,
                font: {
                  family: `${ChartsStyles.fontFamily}`,
                  size: `${ChartsStyles.fontSizeMain}`,
                },
                callback: function(value) {
                  return value;
                }
              }
            }
          },
        },
        plugins: [backgroundPlugin]
      });

      const handleResize = () => {
        const currentChart = Chart.getChart(ctx);
        if (currentChart) {
          currentChart.destroy();
          this.init();
        }
      };

      window.addEventListener('resize', handleResize);
    }, 0);
  }
};

export default MonthlyComparisonChart;