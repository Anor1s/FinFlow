import { FilterButtonItem } from '../../../index.js';

const FilterButtonsList = {
  render(buttonsArray) {
    return `
      <ul class="grid mobile:grid-cols-2 gap-x-base gap-y-sm ">
        ${buttonsArray.map(button => FilterButtonItem.render(button)).join('\n')}
      </ul>
    `;
  }
};

export default FilterButtonsList;