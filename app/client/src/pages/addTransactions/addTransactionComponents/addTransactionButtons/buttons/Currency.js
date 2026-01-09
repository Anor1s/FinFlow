import { SelectButtonCreate, CurrencyButtonData } from '../../../index.js';

const ButtonConfig = {
  categoryName: "Currency*",
  buttonId: "detailsCurrency",
};

const CurrencyButton = {
  render() {
    return SelectButtonCreate.render(CurrencyButtonData, ButtonConfig);
  },

  getValue() {
    return SelectButtonCreate.getValue(ButtonConfig.buttonId).value;
  }
};

export default CurrencyButton;