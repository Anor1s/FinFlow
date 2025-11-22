import { FilterButtonItem } from '../../index.js';

const FilterButtonsList = {
  render(buttonsArray) {
    return `
      <ul class="grid  mobile:grid-cols-2 gap-base">
        ${buttonsArray.map(button => FilterButtonItem.render(button)).join('\n')}
      </ul>
    `;
  }
};

export default FilterButtonsList;