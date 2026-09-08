import {
  AmountButton,
  CurrencyButton,
  CategoryButton,
  DateTimeButton,
  TransactionTypeButton,
  TransactionPlaceButton,
  NoteTextarea,
} from "../../index.js";

function DetailButtonsGetData() {

  return {
    amount: AmountButton.getValue?.() || '',
    currency: CurrencyButton.getValue?.() || '',
    category: {
      icon: CategoryButton.getInfo().icon || '',
      text: CategoryButton.getInfo?.().text || '',
      value: CategoryButton.getValue?.() || '',
    },
    date: DateTimeButton.getValues?.().date || '',
    time: DateTimeButton.getValues?.().time || '',
    transactionType: TransactionTypeButton.getValue?.() || '',
    transactionPlace: TransactionPlaceButton.getValue?.() || '',
    note: NoteTextarea.getValue?.() || '',
  };
}



export default DetailButtonsGetData;