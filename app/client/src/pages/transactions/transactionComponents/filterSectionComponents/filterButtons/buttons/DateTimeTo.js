import { DateButtonCreate } from "../../../../index.js";

const ButtonConfig = {
  categoryName: "Date & Time To",
  buttonId: "transactionDataTimeTo",
};


const DateTimeToButton = {
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

export default DateTimeToButton;