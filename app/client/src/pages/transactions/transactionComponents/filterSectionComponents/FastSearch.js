import { SectionHeading, SearchBar } from '../../index.js'

const CashStatus = {
  render() {
    return `
      <div class="max-h-button-container w-full flex flex-col gap-base">        
        <div class=" flex  flex-col gap-sm">
          ${SectionHeading.render('Fast Search')}
          ${SearchBar.render()}
        </div>
      </div>
    `;
  },

  init() {
    SearchBar.init();
  }
};

export default CashStatus;

