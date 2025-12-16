import {
  DateTimePresetsButton,
  DateTimeFromButton,
  DateTimeToButton,
} from "../../index.js";

const FilterButtonsData = [
  DateTimePresetsButton,
  DateTimeFromButton,
  DateTimeToButton,
];

FilterButtonsData.forEach(component => {
  if (component.init) {
    component.init();
  }
});

export default FilterButtonsData;
