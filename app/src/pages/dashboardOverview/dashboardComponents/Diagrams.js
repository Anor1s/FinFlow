import {SectionHeading, BudgetChart, MonthlyComparisonChart} from "../Index.js";

const Diagrams = {
  render() {
    return `
      <section class="h-screen pt-[16px] w-full flex flex-col gap-sm
                      mobile:h-full laptop:pt-0 laptop:w-2/3" 
      >
        ${SectionHeading.render('Diagrams')}
        <div class="h-full w-full flex flex-col gap-base
                    mobile:flex-row laptop:flex-col "
        >
          ${BudgetChart.render()}
          ${MonthlyComparisonChart.render()}
        </div>
      </section>
    `;
  },

  init() {
    BudgetChart.init();
    MonthlyComparisonChart.init();
  }
};

export default Diagrams;

