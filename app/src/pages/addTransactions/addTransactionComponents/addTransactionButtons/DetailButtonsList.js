import { DetailButtonsItem } from '../../index.js';

const DetailButtonsList = {
  render(buttonsArray) {
    return `
      <ul class="h-full grid mobile:grid-cols-2 gap-x-base gap-y-sm">
        ${buttonsArray.map(button => DetailButtonsItem.render(button)).join('\n')}
      </ul>
    `;
  }
};

export default DetailButtonsList;