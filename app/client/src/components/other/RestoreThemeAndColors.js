import Chart from 'chart.js/auto';

const restoreCSSGradient = () => {
  const colorFirst = localStorage.getItem('colorFirst');
  const colorSecond = localStorage.getItem('colorSecond');

  if (colorFirst && colorSecond) {
    document.documentElement.style.setProperty('--gradient-primary-first', colorFirst);
    document.documentElement.style.setProperty('--gradient-primary-second', colorSecond);
  }
};

const restoreTheme = () => {
  const HTML = document.documentElement;
  const savedTheme = localStorage.getItem('theme');

  HTML.classList.toggle('dark-theme', savedTheme !== 'light');

  updateAllCharts();
};

function updateAllCharts() {
  setTimeout(() => {
    const chartCanvases = document.querySelectorAll('canvas');
    chartCanvases.forEach(canvas => {
      const chart = Chart.getChart(canvas);
      if (chart) {
        const chartId = canvas.id;
      }
    });
  }, 50);
}

export { restoreCSSGradient, restoreTheme, updateAllCharts };