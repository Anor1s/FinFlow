import { DateButtonCreate } from "../../../index.js";

const ButtonConfig = {
  categoryName: "Date & Time",
  buttonId: "transactionDataTime",
};

const DateTimeButton = {
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

export default DateTimeButton;