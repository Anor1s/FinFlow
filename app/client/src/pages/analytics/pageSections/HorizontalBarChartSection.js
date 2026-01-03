import { SectionHeading, HorizontalBarChartCreate } from "../index.js";

const HorizontalBarChartSection = {
  HorizontalBarChartId: 'analyticsHorizontalBarChart',

  render() {
    return `
      <section class="h-screen-pad laptop:h-include-top  w-full flex flex-col gap-base">
        ${SectionHeading.render('Spending by category')}
        ${HorizontalBarChartCreate.render(this.HorizontalBarChartId)}
      </section>
    `
  },

  init() {
    HorizontalBarChartCreate.init(this.HorizontalBarChartId);
  }
};

export default HorizontalBarChartSection;