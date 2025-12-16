import {
  AmountButton,
  CurrencyButton,
  CategoryButton,
  DateTimeButton,
  TransactionTypeButton,
  TransactionPlaceButton,
  NoteTextarea
} from "../../index.js";

const DetailButtonsData = [
  AmountButton,
  CurrencyButton,
  CategoryButton,
  DateTimeButton,
  TransactionTypeButton,
  TransactionPlaceButton,

];


const initDetailButtons = () => {
  DetailButtonsData.forEach(component => {
    if (component.init) {
      component.init();
    }
  });
};

export default DetailButtonsData;
export { initDetailButtons };
