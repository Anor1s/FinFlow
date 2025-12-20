import { SectionHeading, PieChartCreate, LineChartCreate } from "../index.js";

const PieChartId = "analyticsPieChart";
const LineChartId = "analyticsLineChart";

const PieAndLineChartsSection = {
  render() {
    return `
      <section class="h-screen-pad laptop:h-include-top flex-col  w-full flex gap-sm">     
        ${SectionHeading.render('Other')}
        <div class="flex flex-col h-full w-full gap-base">
          ${PieChartCreate.render(PieChartId)}
          ${LineChartCreate.render(LineChartId)} 
        </div>
      </section>
    `
  },

  init() {
    PieChartCreate.init(PieChartId);
    LineChartCreate.init(LineChartId);
  }
};

export default PieAndLineChartsSection;