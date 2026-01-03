import { ChartStore, AppStore, FilterButtonsGetData } from './index.js';

const ChartsTemplate = {
  refreshCallbacks: [],

  render(chartId) {
    return `
      <div 
        data-chart-container="true"         
        data-chart-id="${chartId}"
        data-minimize-laptop-only="true"
        class="chart-container h-full w-full relative min-h-[290px] 
             mobile:min-h-[400px] laptop:min-h-0 transition-all 
             duration-300 ease-in-out cursor-pointer">
        <canvas 
          id="${chartId}" 
          class="absolute inset-0 gradient-secondary rounded-2xl p-[16px] transition-all duration-300"
        ></canvas>
        <div class="laptop:block hidden absolute bottom-[-10px] right-3 text-xs 
                text-text-primary bg-background border-1 border-surface 
                px-2 py-1 rounded">
          Click to minimize
        </div>
      </div>
    `;
  },

  subscribeRefresh(callback) {
    this.refreshCallbacks.push(callback);
  },

  clearSubscribers() {
    this.refreshCallbacks = [];
  },

  getCurrencySymbol() {
    const currencyMap = {
      'USD': '$',
      'EUR': '€',
      'UAH': '₴',
    };
    const code = AppStore.currentCurrency;
    return currencyMap[code] || code;
  },

  async fetchAndRefresh(instance, forceRefresh = false, dataProcessor) {
    try {
      if (forceRefresh && ChartStore.invalidate) {
        ChartStore.invalidate();
      }

      const filters = FilterButtonsGetData();
      const params = {
        from: filters.dateTimeFrom?.date || '',
        to: filters.dateTimeTo?.date || ''
      };

      const rawData = await ChartStore.fetchChartsData(params);
      const processed = dataProcessor(rawData);

      if (instance.chart) {
        instance.chart.options = instance.getChartOptions();
        instance.chart.data.labels = processed.labels;

        if (processed.datasets) {
          processed.datasets.forEach((dataArray, index) => {
            if (instance.chart.data.datasets[index]) {
              instance.chart.data.datasets[index].data = dataArray;
            }
          });
        } else if (processed.values) {

          instance.chart.data.datasets[0].data = processed.values;
          if (processed.colors) {
            instance.chart.data.datasets[0].backgroundColor = processed.colors;
          }
        }
        instance.chart.update();
      }
    } catch (error) {
      console.error("Chart Update Error:", error);
    }
  }
}

window.addEventListener('transactionAdded', async () => {
  for (const callback of ChartsTemplate.refreshCallbacks) {
    await callback();
  }
});

document.addEventListener('click', (event) => {
  const container = event.target.closest('[data-chart-container]');
  if (container && container.dataset.minimizeLaptopOnly === 'true') {
    if (window.matchMedia('(min-width: 1200px)').matches) {
      container.classList.toggle('chart-minimized');
      const label = container.querySelector('div > div');
      if (label) {
        label.textContent = container.classList.contains('chart-minimized')
          ? 'Click to expand'
          : 'Click to minimize';
      }
    }
  }
});



export default ChartsTemplate;

