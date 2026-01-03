import { SelectButtonCreate, CategoryButtonData } from '../../../index.js';

const ButtonConfig = {
  categoryName: "Category*",
  buttonId: "detailsCategory",
};


const CategoryButton = {
  render() {
    return SelectButtonCreate.render(CategoryButtonData, ButtonConfig);
  },

  getValue() {
    return SelectButtonCreate.getValue(ButtonConfig.buttonId).value;
  },

  getInfo() {
    const value = this.getValue();
    const foundItem = CategoryButtonData.find(item => item.value === value);

    return {
      text: foundItem?.text || '',
      icon: foundItem?.icon || '' ,
    }
  }
};

export default CategoryButton;