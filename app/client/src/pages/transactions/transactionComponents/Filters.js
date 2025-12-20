import {FastSearch, FilterCriteria, SortBy} from '../index.js';

const Filters = {
  render() {
    return `
      <section class="h-full laptop:h-include-top w-full flex flex-col gap-base"> 
        <div class="h-full flex flex-col gap-base">
          ${FastSearch.render()}
          ${FilterCriteria.render()}
          ${SortBy.render()}
        </div>
      </section>
    `;
  }
};

export default Filters;

