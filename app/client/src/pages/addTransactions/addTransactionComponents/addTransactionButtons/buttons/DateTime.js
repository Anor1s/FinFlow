import { DateButtonCreate } from "../../../index.js";

const getNowForInput = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return (new Date(now - offset)).toISOString().slice(0, 16);
};

const ButtonConfig = {
  categoryName: "Date & Time",
  buttonId: "transactionDataTime",
};

const DateTimeButton = {
  render() {
    return DateButtonCreate.render(ButtonConfig);
  },

  init() {
    DateButtonCreate.init(ButtonConfig);
    this.setDefaultNow();
  },

  setDefaultNow() {
    const input = document.getElementById(ButtonConfig.buttonId);
    if (input) {
      input.value = getNowForInput();
    }
  },

  getValues() {
    return DateButtonCreate.getValues(ButtonConfig.buttonId);
  }
};

export default DateTimeButton;