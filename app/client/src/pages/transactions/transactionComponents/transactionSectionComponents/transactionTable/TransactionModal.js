import {
  TableIncomeIcon,
  TableExpenseIcon,
  CloseIcon,
  EditIcon,
  DeleteIcon,
  CategoryButtonData,
  TransactionService,

  Dialog,
} from '../../../index.js'

const TransactionModal = {
  currentTransaction: null,
  escHandler: null,

  render (transactionData, currency) {
    const categoryMap = new Map(CategoryButtonData.map(item => [item.value, item]));

    const isIncome = transactionData.transactionType?.toLowerCase() === "income";
    const typeIcon = isIncome ? TableIncomeIcon : TableExpenseIcon;

    const currencySymbol = this.getCurrencySymbol(currency);

    const rawAmount = transactionData.amount_base || transactionData.amount;
    const formattedAmount = new Intl.NumberFormat('uk-UA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rawAmount).replace(/\s/g, '\u00A0');

    const foundItem = categoryMap.get(transactionData.category);
    const iconSrc = foundItem ? foundItem.icon : '';
    const categoryText = foundItem ? foundItem.text : (transactionData.category || 'Other');
    const formattedDate = this.formatDate(transactionData.date);

    return `
      <div 
        class="absolute inset-0 z-[100] flex items-center 
        justify-center p-4 backdrop-blur-xs bg-black/40 
        animate-in fade-in duration-200
        w-full p-[16px] tablet:p-[24px]" 
        id="transaction-modal"
      > 
        <div  
          class="w-full my-auto border-2 rounded-lg p-[16px] flex flex-col gap-sm text-base mobile:text-xl text-white bg-surface/50"
          style="border-color: var(--gradient-primary-first);"
        > 
          <div class="w-full flex flex-row justify-between">
            <div class="flex flex-col gap-sm">
              <span class="w-full">
                ID - ${transactionData.id}
              </span>
              <div class="flex flex-row gap-sm items-center">
                <img 
                  class="brightness-0 invert "
                  src="${iconSrc}" 
                  alt="icon"
                  width="24"
                  height="24"
                  loading="lazy"
                />
                <span>
                  ${categoryText}
                </span>
              </div>
              <div class="flex flex-row gap-sm items-center ">
                <img 
                  src="${typeIcon}"  
                  alt="icon"
                  width="24"
                  height="24"
                  title="${transactionData.transactionType}"
                  loading="lazy"
                />
                <span>
                  ${currencySymbol} ${formattedAmount}
                </span>
              </div>                 
              <span>${formattedDate} ${transactionData.time}</span> 
              <span>${transactionData.place}</span>
            </div>
            <div class="flex flex-col gap-sm">
              <button 
                type="button"
                id="close-modal-btn"
                class="p-[6px] rounded-full flex items-center justify-center hover:bg-surface-response transition-colors duration-200"
                >
                <img
                  class="brightness-0 invert "
                  src="${CloseIcon}"  
                  alt="close"
                  width="20"
                  height="20"
                  loading="lazy"
                />
              </button>            
              <button 
                type="button"
                id="delete-transaction-btn"
                class="p-[6px] rounded-full flex items-center justify-center hover:bg-surface-response transition-colors duration-200"
              >
                <img
                  class="brightness-0 invert"
                  src="${DeleteIcon}"  
                  alt="close"
                  width="24"
                  height="24"
                  loading="lazy"
                />
              </button>
              
            </div>
          </div>
          <span class="opacity-80">${transactionData.note || ''}</span>
        </div>
      </div>
    `
  },

  formatDate (dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  },

  getCurrencySymbol (currency) {
    const currencyMap = {
      'USD': '$',
      'EUR': '€',
      'UAH': '₴',
    };
    return currencyMap[currency] || currency;
  },

  open (transactionData, currencySymbol) {
    const table = document.getElementById('all-transactions-table');
    if (!table) return;

    this.currentTransaction = transactionData;

    table.classList.add('relative');
    table.style.overflow = 'hidden';

    const existingModal = document.getElementById('transaction-modal');
    if (existingModal) existingModal.remove();

    const modalHtml = this.render(transactionData, currencySymbol);
    table.insertAdjacentHTML('beforeend', modalHtml);

    this.setupEventListeners();
  },

  close () {
    const modal = document.getElementById('transaction-modal');
    const table = document.getElementById('all-transactions-table');

    if (modal) {
      modal.remove();
      if (table) table.style.overflow = '';

      if (this.escHandler) {
        document.removeEventListener('keydown', this.escHandler);
        this.escHandler = null;
      }
      this.currentTransaction = null;
    }
  },

  setupEventListeners () {
    document.getElementById('close-modal-btn')?.addEventListener('click', () => this.close());

    this.escHandler = (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this.escHandler);

    document.getElementById('transaction-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'transaction-modal') this.close();
    });

    const deleteBtn = document.getElementById('delete-transaction-btn');
    if (deleteBtn) {
      deleteBtn.onclick = async () => {
        const confirmed = await Dialog.confirm('Are you sure you want to delete this record?', {
          title: 'Confirm Deletion',
          confirmText: 'Delete',
          cancelText: 'Cancel',
        });

        if (!confirmed) return;

        try {
          await TransactionService.delete(this.currentTransaction.id);

          this.close();

          await Dialog.alert('Transaction deleted successfully!');

          window.dispatchEvent(new CustomEvent('transactionAdded'));
        } catch (err) {
          console.error("Delete Error:", err.message);
        }
      };
    }
  }
};

export default TransactionModal;