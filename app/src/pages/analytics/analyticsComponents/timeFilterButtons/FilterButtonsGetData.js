import {
  DateTimePresetsButton,
  DateTimeFromButton,
  DateTimeToButton,
} from "../../index.js";

function FilterButtonsGetData() {
  return {
    dateTimePreset: DateTimePresetsButton.getValue?.() || '',
    dateTimeFrom: DateTimeFromButton.getValues?.() || '',
    dateTimeTo: DateTimeToButton.getValues?.() || '',
  };
}

export default FilterButtonsGetData;