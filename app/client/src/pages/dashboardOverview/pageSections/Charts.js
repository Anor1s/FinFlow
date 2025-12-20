import {SectionHeading, PieChartCreate, StackedBarChartCreate } from "../Index.js";

const PieChartId = "dashboardPieChart";
const StackedBarChartId = "dashboardStackedBarChart"

const Charts = {
  render() {
    return `
      <section class="h-screen pt-[16px] w-full flex flex-col gap-sm
                      mobile:h-full laptop:pt-0 laptop:w-2/3" 
      >
        ${SectionHeading.render('Charts')}
        <div class="h-full w-full flex flex-col gap-base
                    mobile:flex-row laptop:flex-col "
        >
          ${PieChartCreate.render(PieChartId)}
          ${StackedBarChartCreate.render(StackedBarChartId)}
        </div>
      </section>
    `;
  },

  init() {
    PieChartCreate.init(PieChartId);
    StackedBarChartCreate.init(StackedBarChartId);
  }
};

export default Charts;

