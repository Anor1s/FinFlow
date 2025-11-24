import { SectionHeading, HorizontalBarChartCreate } from "../index.js";

const HorizontalBarChartId = 'analyticsHorizontalBarChart';

const HorizontalBarChartSection = {
  render() {
    return `
      <section class="h-include-top  w-full flex flex-col gap-base">
        ${SectionHeading.render('Spending by category')}
        ${HorizontalBarChartCreate.render(HorizontalBarChartId)}
      </section>
    `
  },

  init() {
    HorizontalBarChartCreate.init(HorizontalBarChartId);
  }
};

export default HorizontalBarChartSection;