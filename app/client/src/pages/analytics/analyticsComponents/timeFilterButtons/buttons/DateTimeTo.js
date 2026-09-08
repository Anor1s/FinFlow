import { DateTimeButtonCreate } from "../../../index.js";

const ButtonConfig = {
  categoryName: "Date & Time To",
  buttonId: "analyticsDateTimeTo",
};


const DateTimeToButton = {
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

export default DateTimeToButton;