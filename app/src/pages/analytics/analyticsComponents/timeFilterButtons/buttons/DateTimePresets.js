import { SelectButtonCreate } from "../../../index.js";

const ButtonData = [
  {  value: 'today', text: 'Today' },
  {  value: 'yesterday', text: 'Yesterday' },
  {  value: 'lastWeek', text: 'Last Week' },
  {  value: 'lastMonth', text: 'Last Month' },
  {  value: 'lastYear', text: 'Last Year' },
  {  value: 'allTime', text: 'All Time' },
];

const ButtonConfig = {
  categoryName: "Date & Time Presets",
  buttonId: "analyticsDateTimePresets",
};


const DateTimePresetsButton = {
  render() {
    return SelectButtonCreate.render(ButtonData, ButtonConfig);
  },

  getValue() {
    return SelectButtonCreate.getValue(ButtonConfig.buttonId).value;
  }
};

export default DateTimePresetsButton;