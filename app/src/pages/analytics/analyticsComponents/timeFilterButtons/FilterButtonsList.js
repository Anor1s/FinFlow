import { FilterButtonsItem } from '../../index.js';

const FilterButtonsList = {
  render(buttonsArray) {
    return `
      <ul 
        class="grid mobile:grid-cols-2 gap-x-base gap-y-sm first-child-full-width"
        style=".grid-cols-2-custom > *:first-child {
            grid-column: 1 / -1;}"
      > 
        ${buttonsArray.map(button => FilterButtonsItem.render(button)).join('\n')}
      </ul>
    `;
  }
};

export default FilterButtonsList;