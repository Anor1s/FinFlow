import { SectionHeading, FilterButtonsData, FilterButtonsList, InitManagerClear, InitManagerCreate } from '../../index.js';

const FilterCriteria = {
  render() {
    InitManagerClear(FilterButtonsData);

    return `
      <div class="  w-full flex flex-col gap-base"> 
        <div class=" flex flex-col gap-sm">
          ${SectionHeading.render('Filter Criteria')}
          ${FilterButtonsList.render(FilterButtonsData)}
        </div>
      </div>
    `;
  },

  init() {
    InitManagerCreate(FilterButtonsData)
  }
};

export default FilterCriteria;