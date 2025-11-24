import { SectionHeading, PieChartCreate, LineChartCreate } from "../index.js";

const PieChartId = "analyticsPieChart";
const LineChartId = "analyticsLineChart";

const PieAndLineChartsSection = {
  render() {
    return `
      <section class="h-full laptop:h-include-top flex-col  w-full flex laptop:flex-col gap-base">     
        ${SectionHeading.render('Other')}
        ${PieChartCreate.render(PieChartId)}
        ${LineChartCreate.render(LineChartId)} 
      </section>
    `
  },

  init() {
    PieChartCreate.init(PieChartId);
    LineChartCreate.init(LineChartId);
  }
};

export default PieAndLineChartsSection;