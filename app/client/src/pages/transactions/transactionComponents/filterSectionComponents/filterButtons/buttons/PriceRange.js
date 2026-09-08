import { PriceRangeButtonCreate, AppStore } from '../../../../index.js';

const ButtonConfig = {
  categoryName: "Price Range",
  buttonInputMinId: "filterMinPriceRange",
  buttonInputMaxId: "filterMaxPriceRange"
};

const PriceRangeButton = {
  render() {
    return PriceRangeButtonCreate.render(ButtonConfig);
  },

  init() {
    PriceRangeButtonCreate.init(ButtonConfig);
  },

  reset() {
    PriceRangeButtonCreate.reset(ButtonConfig);
  },

  getValues() {
    const values = PriceRangeButtonCreate.getValues(ButtonConfig);

    return {
      ...values,
      currency: AppStore.currentCurrency
    };
  },
};

export default PriceRangeButton;