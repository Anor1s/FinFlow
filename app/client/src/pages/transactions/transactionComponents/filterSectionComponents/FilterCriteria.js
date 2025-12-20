import { SectionHeading, FilterButtonsData, FilterButtonsList } from '../../index.js';

const FilterCriteria = {
  render() {
    return `
      <div class="  w-full flex flex-col gap-base"> 
        <div class=" flex flex-col gap-sm">
          ${SectionHeading.render('Filter Criteria')}
          ${FilterButtonsList.render(FilterButtonsData)}
        </div>
      </div>
    `;
  }
};

export default FilterCriteria;