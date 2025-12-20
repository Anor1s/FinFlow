import { DateButtonCreate } from "../../../../index.js";

const ButtonConfig = {
  categoryName: "Date & Time From",
  buttonId: "transactionDataTimeFrom",
};


const DateTimeFromButton = {
  render() {
    return DateButtonCreate.render(ButtonConfig)
  },

  init() {
    DateButtonCreate.init(ButtonConfig);
  },

  getValues() {
    return DateButtonCreate.getValues(ButtonConfig.buttonId);
  }
};

export default DateTimeFromButton;