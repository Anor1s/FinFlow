import {
  PageTemplate,
  FiltersAndDiagramsContainer,
  HorizontalBarChartSection,
  PieAndAsdChartsSection,
} from './index.js'

const Analytics = {
  render() {
    return PageTemplate.render([
      FiltersAndDiagramsContainer.render(),
      HorizontalBarChartSection.render(),
      PieAndAsdChartsSection.render(),
    ])
  },

  init() {
    FiltersAndDiagramsContainer.init();
    HorizontalBarChartSection.init();
    PieAndAsdChartsSection.init();
  }
};

window.updateTransactionFilters = () => {
  if (window.TransactionList) {
    window.TransactionList.applyFilters();
  }

  if (window.PieChartInstance) window.PieChartInstance.updateChart();
  if (window.LineChartInstance) window.LineChartInstance.updateChart();
  if (window.StackedBarChartInstance) window.StackedBarChartInstance.updateChart();
  if (window.HorizontalBarChartInstance) window.HorizontalBarChartInstance.updateChart();
};

export default Analytics;


