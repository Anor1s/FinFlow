import { Item, SummaryService, ItemsData } from '../Index.js';

const List = {
  render() {
    return `
      <div class="h-full w-full">
        <ul id="overview-cards-list" class="h-full grid grid-cols-1 mobile:grid-cols-2 
            laptop:grid-cols-1 gap-[16px]">
          <li class="text-text-secondary animate-pulse p-4">Loading stats...</li>
        </ul>
      </div>  
    `;
  },

  async init() {

    window.addEventListener('currencyChanged', async () => {
      await this.updateCards();
    });

    window.addEventListener('transactionAdded', async () => {
      await this.updateCards();
    });

    await this.updateCards();
  },

  async updateCards() {
    const listElement = document.getElementById('overview-cards-list');
    if (!listElement) return;

    try {
      const response = await SummaryService.getSummary();
      const summary = response.summary;

      const dynamicItems = ItemsData.formatDashboardItems(summary);

      listElement.innerHTML = dynamicItems.map(item => Item.render(item)).join('\n');

    } catch (error) {
      console.error("Dashboard List Error:", error);
      listElement.innerHTML = `<li class="text-red-400 p-4">Error loading data</li>`;
    }
  }
};

export default List;