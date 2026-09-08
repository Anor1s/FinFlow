import { SectionHeading, SortButtonsList, SortButtonsData, InitManagerClear, InitManagerCreate, SortButtonCreate } from '../../index.js';

const SortBy = {
  render() {
    InitManagerClear(SortButtonsData);

    return `
      <div class="w-full flex flex-col gap-base"> 
        <div class="flex flex-col gap-sm">
          ${SectionHeading.render('Sort By')}
          ${SortButtonsList.render(SortButtonsData)}
        </div>
      </div>
    `;
  },

  init() {
    InitManagerCreate(SortButtonsData);
    SortButtonCreate.initButtons();
  }
};

export default SortBy;

