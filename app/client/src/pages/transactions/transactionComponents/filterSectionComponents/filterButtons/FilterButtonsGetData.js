import {
  PriceRangeButton,
  CategoryButton,
  DateTimeFromButton,
  DateTimeToButton,
  TransactionTypeButton,
  TransactionPlaceButton,
  AppStore
} from "../../../index.js";

function FilterButtonsGetData() {
  const currentGlobalCurrency = AppStore.currentCurrency || '';

  return {
    currentCurrency: currentGlobalCurrency,
    priceRangeMin: PriceRangeButton.getValues?.().min || 0,
    priceRangeMax: PriceRangeButton.getValues?.().max || Infinity,
    category: {
      icon: CategoryButton.getInfo().icon || '',
      text: CategoryButton.getInfo?.().text || '',
      value: CategoryButton.getValue?.() || '',
    },
    dateTimeFrom: DateTimeFromButton.getValues?.() || '',
    dateTimeTo: DateTimeToButton.getValues?.() || '',
    transactionType: TransactionTypeButton.getValue?.() || '',
    transactionPlace: TransactionPlaceButton.getValue?.()?.trim() || '',
  };
}

export default FilterButtonsGetData;