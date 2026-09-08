import { SectionHeading, PieChartCreate, LineChartCreate } from "../index.js";

const PieAndLineChartsSection = {
  PieChartId: "analyticsPieChart",
  LineChartId: "analyticsLineChart",

  render() {
    return `
      <section class="h-screen-pad laptop:h-include-top flex-col  w-full flex gap-sm">     
        ${SectionHeading.render('Other')}
        <div class="flex flex-col h-full w-full gap-base">
          ${PieChartCreate.render(this.PieChartId)}
          ${LineChartCreate.render(this.LineChartId)} 
        </div>
      </section>
    `
  },

  init() {
    PieChartCreate.init(this.PieChartId);
    LineChartCreate.init(this.LineChartId);
  }
};

export default PieAndLineChartsSection;