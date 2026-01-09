import {
  TableIncomeIcon,
  TableExpenseIcon,
  CategoryButtonData,
} from "../../../index.js";

const categoryMap = new Map(CategoryButtonData.map(item => [item.value, item]));

const Transaction = {
  render(transactionData, userBaseCurrency) {
    const isIncome = transactionData.transactionType?.toLowerCase() === "income";
    const typeIcon = isIncome ? TableIncomeIcon : TableExpenseIcon;

    let displaySymbol = '';
    switch (userBaseCurrency?.toUpperCase()) {
      case 'USD': displaySymbol = '$'; break;
      case 'UAH': displaySymbol = '₴'; break;
      case 'EUR': displaySymbol = '€'; break;
      default: displaySymbol = userBaseCurrency || '';
    }

    const rawAmount = transactionData.amount_base || transactionData.amount || 0;
    let formattedAmount;

    if (rawAmount >= 1000000) {
       const millions = rawAmount / 1000000;
      formattedAmount = new Intl.NumberFormat('uk-UA', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(millions) + 'M';
    } else {

      formattedAmount = new Intl.NumberFormat('uk-UA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(rawAmount).replace(/\s/g, '\u00A0');
    }

    const foundItem = categoryMap.get(transactionData.category);
    const iconSrc = foundItem ? foundItem.icon : '';
    const categoryText = foundItem ? foundItem.text : (transactionData.category || 'Other');

    return `
        <li 
          class="transaction h-[80px] w-full flex flex-col px-[16px]
                items-center justify-center gap-xs hover:bg-surface duration-200 
                hover:cursor-pointer transition ease transition-color"
          id="${transactionData.id}"
        >
          <div class="w-full flex flex-row justify-between gap-sm">
            <div class="h-full flex flex-row gap-sm items-center">
              <img
                class="icon" 
                src="${iconSrc}" 
                alt="icon"
                width="24"
                height="24"
                loading="lazy"
              />
              <span class="text-text-tertiary text-base mobile:text-lg laptop:text-xl">
                ${categoryText}
              </span>
            </div>
            
            <div class="flex flex-row gap-sm items-center">
              <img 
                src="${typeIcon}"  
                alt="icon"
                width="24"
                height="24"
                title="${transactionData.transactionType}"
                loading="lazy"
              />
              <span class="text-text-tertiary text-base mobile:text-lg laptop:text-xl">
                ${displaySymbol}\u00A0${formattedAmount}
              </span>
            </div>
          </div>
                        
          <div class="w-full flex flex-row justify-between gap-sm text-xs mobile:text-sm text-text-secondary">
            <div class="flex flex-row gap-sm">
              <span class="hidden mobile:block text-base text-text-primary">${transactionData.place || ''}</span>
              <span class="text-base text-text-primary">${transactionData.date}</span>
            </div>
            
            <div class="flex flex-row gap-sm">
              <span class="text-base text-text-primary">${transactionData.time}</span>
            </div>
          </div>
        </li>
      `;
  }
}

export default Transaction;