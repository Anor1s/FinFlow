import {
  PriceRangeButton,
  CategoryButton,
  DateTimeFromButton,
  DateTimeToButton,
  TransactionTypeButton,
  TransactionPlaceButton,
} from "../../../index.js";

function FilterButtonsGetData() {
  return {
    priceRangeMin: PriceRangeButton.getValues?.().min || 0,
    priceRangeMax: PriceRangeButton.getValues?.().max || 1000,
    category: {
      icon: CategoryButton.getInfo().icon || '',
      text: CategoryButton.getInfo?.().text || '',
      value: CategoryButton.getValue?.() || '',
    },
    dateTimeFrom: DateTimeFromButton.getValues?.() || '',
    dateTimeTo: DateTimeToButton.getValues?.() || '',
    transactionType: TransactionTypeButton.getValue?.() || '',
    transactionPlace: TransactionPlaceButton.getValue?.() || '',
  };
}

export default FilterButtonsGetData;