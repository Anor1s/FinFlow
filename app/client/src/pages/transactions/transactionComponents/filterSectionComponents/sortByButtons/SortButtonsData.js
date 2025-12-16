import {
  SortButtonCreate,
  SortByCategoryButton,
  SortByDateTimeButton,
  SortByAmountButton
} from "../../../index.js";

const SortButtonsData = [
  SortByCategoryButton,
  SortByDateTimeButton,
  SortByAmountButton
];

SortButtonsData.forEach(component => {
  if (component.init) {
    component.init();
  }
});

SortButtonCreate.initButtons();

export default SortButtonsData;
