import { SortButtonItem } from "../../../index.js";

const SortButtonsList = {
  render(buttonsArray) {
    return`
      <ul class="grid mobile:grid-cols-2 gap-base">
        ${buttonsArray.map(button => SortButtonItem.render(button)).join('\n')}
      </ul>
    `
  }
};

export default SortButtonsList;

