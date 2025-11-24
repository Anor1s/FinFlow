import {
  TransactionTypeButton,
  CategoryButton,
  DateTimeFromButton,
  DateTimeToButton,
  TransactionPlaceButton,
  PriceRangeButton
} from "../../../index.js";
import {NoteTextarea} from "../../../../addTransactions/index.js";

const FilterButtonsData = [
  PriceRangeButton,
  CategoryButton,
  DateTimeFromButton,
  DateTimeToButton,
  TransactionTypeButton,
  TransactionPlaceButton,
];

FilterButtonsData.forEach(component => {
  if (component.init) {
    component.init();
  }
});

export default FilterButtonsData;
