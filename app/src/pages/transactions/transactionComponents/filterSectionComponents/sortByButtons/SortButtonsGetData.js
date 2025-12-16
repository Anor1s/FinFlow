import {
  SortByAmountButton,
  SortByCategoryButton,
  SortByDateTimeButton
} from "../../../index.js";

function SortByButtonsGetData() {
  return {
    byAmount: SortByAmountButton.getValue(),
    byCategory: SortByCategoryButton.getValue(),
    byDateTime: SortByDateTimeButton.getValue()
  };
}

export default SortByButtonsGetData;