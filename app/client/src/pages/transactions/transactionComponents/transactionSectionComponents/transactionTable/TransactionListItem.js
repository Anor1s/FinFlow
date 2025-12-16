import {
  TableIncomeIcon,
  TableExpenseIcon,
  CategoryButtonData
} from "../../../index.js";

const categoryMap = new Map(CategoryButtonData.map(item => [item.value, item]));

const TransactionListItem = {
  render(transactionData) {
    const icon = transactionData.transactionType === "Income" ? TableIncomeIcon : TableExpenseIcon;
    let currency;
    if (transactionData.currency.toUpperCase() === "USD") currency = '$';

    const foundItem = categoryMap.get(transactionData.category);
    const categoryText = foundItem ? foundItem.text : transactionData.category;

    return `
        <li 
          class="h-[80px] w-full  flex flex-col px-[16px]  
                items-center justify-center gap-xs  hover:bg-surface duration-200 
                transition ease transition-color"
          id="${transactionData.id}"
        >
          <div class="w-full flex flex-row  justify-between gap-sm">
            <div class="h-full flex flex-row gap-sm">
              <img 
                src="${foundItem.icon}" 
                alt="icon"
                width="24"
                height="24"
                loading="lazy"
              />
              <span class="text-text-tertiary text-base mobile:text-lg laptop:text-xl">${categoryText}</span>
            </div>
            
            <div class="flex flex-row gap-sm">
              <img 
                src="${icon}"  
                alt="icon"
                width="24"
                height="24"
                title="${transactionData.transactionType}"
                loading="lazy"
              />
              <span class="text-text-tertiary text-base  mobile:text-lg  laptop:text-xl">${currency}</span>
              <span class="text-text-tertiary text-base  mobile:text-lg  laptop:text-xl">${transactionData.amount}</span>
            </div>
          </div>
                        
          <div class="w-full flex flex-row  justify-between gap-sm">
            <div class="flex flex-row gap-sm">
              <span>${transactionData.place}</span>
              <span>${transactionData.date}</span>
            </div>
            
            <div class="flex flex-row gap-sm">
              <span>${transactionData.time}</span>
            </div>
          </div>
        </li>
      `
  }
}

export default TransactionListItem;

