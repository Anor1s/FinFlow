import { Chart, ChartsTemplate, ChartsStyles } from '../index.js';

const chartId = 'budgetChart';

const BudgetChart = {
  render() {
    return `
      ${ChartsTemplate.render(chartId)}
    `;
  },

  init() {
    setTimeout(() => {
      const ctx = document.getElementById(chartId);
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Housing', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Savings', 'Other'],
            datasets: [{
              data: [300, 50, 100, 100, 100, 100, 100, 50],
              backgroundColor: [
                '#FF8FA3', '#6EC6FF', '#FFD966', '#66CFC7',
                '#B399FF', '#FFB366', '#FF6B6B', '#9EE86F'
              ],
              borderColor: 'transparent',
              borderWidth: 2,
              hoverOffset: 30,
              hoverBorderColor: `${ChartsStyles.color}`,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '40%',
            layout: {},
            plugins: {
              title: {
                display: true,
                text: 'Budget Distribution',
                position: 'top',
                font: {
                  family: `${ChartsStyles.fontFamily}`,
                  size: `${ChartsStyles.fontSizeLabel}`,
                  weight: 'bold'
                },
                color: `${ChartsStyles.color}`,
              },
              legend: {
                position: 'bottom',
                title: {
                  display: true,
                },
                labels: {
                  padding: 10,
                  boxWidth: 16,
                  font: {
                    family: `${ChartsStyles.fontFamily}`,
                    size: `${ChartsStyles.fontSizeMain}`
                  },
                  color: `${ChartsStyles.color}`
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
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = Math.round((context.parsed / total) * 100);
                    return `${context.label}: ${context.parsed} (${percentage}%)`;
                  }
                },
                xAlign: 'center',
                yAlign: 'bottom',
                caretPadding: 20,
                position: 'nearest',
              }
            },
          },
        });
      }
    }, 0);
  }
};

export default BudgetChart;