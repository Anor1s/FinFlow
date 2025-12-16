import {
  StackedBarChartCreate,
  SectionHeading,
  FilterButtonsList, FilterButtonsData
} from "../index.js";

const StackedBarChartId = 'analyticsStackedBarChart'

const FiltersAndStackedBarChartSection = {
  render() {
    return `
      <section class="h-full  w-full flex flex-col gap-base">
        <div class="h-fit w-full flex flex-col gap-sm">
          ${SectionHeading.render('Time Range')}
          ${FilterButtonsList.render(FilterButtonsData)}
        </div>
        
         <div class="h-full mobile:h-full w-full flex flex-col gap-sm ">
            ${SectionHeading.render('Budget Allocation')}
            ${StackedBarChartCreate.render(StackedBarChartId)}
        </div>
      </section>
    `
  },

  init() {
    StackedBarChartCreate.init(StackedBarChartId);
  }
};

export default FiltersAndStackedBarChartSection;