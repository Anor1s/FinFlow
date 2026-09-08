import {
  StackedBarChartCreate,
  SectionHeading,
  FilterButtonsList,
  FilterButtonsData,
  InitManagerCreate,
  InitManagerClear
} from "../index.js";

const FiltersAndStackedBarChartSection = {
  StackedBarChartId: 'analyticsStackedBarChart',

  render() {
    InitManagerClear(FilterButtonsData);

    return `
      <section class="h-full  w-full flex flex-col gap-base">
        <div class="h-fit w-full flex flex-col gap-sm">
          ${SectionHeading.render('Time Range')}
          ${FilterButtonsList.render(FilterButtonsData)}
        </div>
        
         <div class="h-screen-pad mobile:h-full w-full flex flex-col gap-sm ">
            ${SectionHeading.render('Budget Allocation')}
            ${StackedBarChartCreate.render(this.StackedBarChartId)}
        </div>
      </section>
    `
  },

  init() {
    InitManagerCreate(FilterButtonsData);
    StackedBarChartCreate.init(this.StackedBarChartId);
  }
};

export default FiltersAndStackedBarChartSection;