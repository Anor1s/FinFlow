import { FilterButtonsItem } from '../../index.js';

const FilterButtonsList = {
  render(buttonsArray) {
    return `
      <ul 
        class="grid gap-x-base gap-y-sm first-child-full-width"
      > 
        ${buttonsArray.map(button => FilterButtonsItem.render(button)).join('\n')}
      </ul>
    `;
  }
};

export default FilterButtonsList;