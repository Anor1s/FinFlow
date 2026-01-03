import { DateTimeButtonCreate } from "../../../index.js";

const ButtonConfig = {
  categoryName: "Date & Time From",
  buttonId: "analyticsDateTimeFrom",
};


const DateTimeFromButton = {
  render() {
    return DateTimeButtonCreate.render(ButtonConfig)
  },

  init() {
    DateTimeButtonCreate.init(ButtonConfig);
  },

  getValues() {
    return DateTimeButtonCreate.getValues(ButtonConfig.buttonId);
  }
};

export default DateTimeFromButton;