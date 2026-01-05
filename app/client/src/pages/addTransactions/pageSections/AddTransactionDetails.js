import {
  SectionHeading, DetailButtonsList, DetailButtonsData, PreviewTransaction,
  NoteTextarea, DetailButtonsRender, AddTransactionButton,
  DetailButtonsGetData, TransactionService, DateTimeButton, Dialog,

  InitManagerCreate,
  InitManagerClear
} from '../index.js';




const AddTransactionDetails = {
  render() {
    InitManagerClear(DetailButtonsData)

    return `
      <section class="h-full mobile:h-incule-top w-full flex flex-col gap-base">
        ${SectionHeading.render('Transaction Details')}
        ${DetailButtonsList.render(DetailButtonsData)}
        ${NoteTextarea.render()}
        ${PreviewTransaction.render()}
        ${AddTransactionButton.render()}
      </section>
    `;
  },

  resetForm() {
    InitManagerClear(DetailButtonsData)

    if (DateTimeButton.setDefaultNow) {
      DateTimeButton.setDefaultNow();
    }

    const textarea = document.querySelector('textarea');
    if (textarea) textarea.value = '';

    setTimeout(() => {
      DetailButtonsRender.initPreviewTransaction();
    }, 100);
  },

  validate(data) {
    // Check Amount
    if (!data.amount || parseFloat(data.amount) <= 0) {
      Dialog.alert("Please enter a valid amount");
      return false;
    }

    // Check Category
    if (!data.category) {
      Dialog.alert("Please select a category");
      return false;
    }

    // Check Currency
    if (!data.currency) {
      Dialog.alert("Please select a currency");
      return false;
    }

    // Check Transaction Type (Income/Expense)
    if (!data.transactionType) {
      Dialog.alert("Please select a transaction type");
      return false;
    }

    return true;
  },

  init() {
    InitManagerCreate(DetailButtonsData)

    if (DateTimeButton.setDefaultNow) {
      DateTimeButton.setDefaultNow();
    }

    setTimeout(() => {
      DetailButtonsRender.initPreviewTransaction();
    }, 200);

    const btn = document.getElementById('addTransaction');
    if (btn) {
      btn.addEventListener('click', async () => {
        const data = DetailButtonsGetData();
        if (!this.validate(data)) return;

        try {
          btn.disabled = true;
          const result = await TransactionService.create(data);

          window.dispatchEvent(new CustomEvent('transactionAdded'));
          this.resetForm();
          window.updateTransactionFilters();

          Dialog.alert('Transaction added successfully!');
        } catch (error) {
          Dialog.alert('Error: ' + error.message);
        } finally {
          btn.disabled = false;
        }
      });
    }
  },
};

export default AddTransactionDetails;