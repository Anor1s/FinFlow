import {
  PageTemplate,
  FiltersAndDiagramsContainer,
  HorizontalBarChartSection,
  PieAndAsdChartsSection,

  DateTimeFilter,
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
    DateTimeFilter.init();
  }
};

export default Analytics;


