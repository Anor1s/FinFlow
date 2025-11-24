import { SectionHeading, SortButtonsList, SortButtonsData } from '../../index.js';

const SortBy = {
  render() {
    return `
      <div class="w-full flex flex-col gap-base"> 
        <div class="flex flex-col gap-sm">
          ${SectionHeading.render('Sort By')}
          ${SortButtonsList.render(SortButtonsData)}
        </div>
      </div>
    `;
  }
};

export default SortBy;

