  import { PriceRangeButtonCreate } from '../../../../index.js';

  const ButtonConfig = {
    categoryName: "Price Range",
    buttonInputMinId: "filterMinPriceRange",
    buttonInputMaxId: "filterMaxPriceRange"
  };

  const PriceRangeButton = {
    render() {
      return PriceRangeButtonCreate.render(ButtonConfig);
    },

    getValues() {
      return PriceRangeButtonCreate.getValues(ButtonConfig);
    }
  };

  export default PriceRangeButton;

