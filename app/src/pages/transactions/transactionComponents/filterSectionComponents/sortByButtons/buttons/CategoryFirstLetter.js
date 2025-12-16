import {SortButtonCreate} from '../../../../index.js';

const ButtonData = {
  categoryNone: {
    value: 'categoryNone',
    icon: '↕',
    text: 'Category',
    tooltip: 'Clear category sorting'
  },
  categoryAsc: {
    value: 'categoryAsc',
    icon: 'A - Z',
    text: 'Category',
    tooltip: 'Sort by category: A-Z'
  },
  categoryDesc: {
    value: 'categoryDesc',
    icon: 'Z - A',
    text: 'Category',
    tooltip: 'Sort by category: Z-A'
  },
};

const ButtonConfig = {
  buttonId: "sortByCategory",
};

const SortByCategoryButton = {
  render() {
    return SortButtonCreate.render(ButtonConfig, ButtonData);
  },

  getValue() {
    return SortButtonCreate.getValue(ButtonConfig.buttonId).value;
  }
};

export default SortByCategoryButton;
