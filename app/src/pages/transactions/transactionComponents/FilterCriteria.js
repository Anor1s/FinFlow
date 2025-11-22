import { SectionHeading, FilterButtonsData, FilterButtonsList } from '../index.js';

const FilterCriteria = {
  render() {
    return `
      <section class="h-full w-full flex flex-col gap-base"> 
        <div class="flex flex-col gap-sm">
          ${SectionHeading.render('Filter Criteria')}
          ${FilterButtonsList.render(FilterButtonsData)}
        </div>
      </section>
    `;
  }
};

export default FilterCriteria;