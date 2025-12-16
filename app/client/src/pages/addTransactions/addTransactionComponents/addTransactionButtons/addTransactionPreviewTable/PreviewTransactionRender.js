import { IncomeIcon, ExpenseIcon, DetailButtonsGetData } from "../../../index.js";

const DetailButtonsRender = {
  transactionData: {
    amount: '',
    currency: '',
    category: '',
    date: '',
    time: '',
    transactionType: '',
    transactionPlace: '',
    note: '',
  },

  updatePreview() {
    this.transactionData = DetailButtonsGetData();

    const previewElement = document.querySelector('[data-preview-transaction]');

    if (previewElement) {
      this.updatePreviewElements(previewElement, this.transactionData);
    } else {
      console.warn('Preview element not found');
    }
  },

  updatePreviewElements(container, data) {
    this.updateCategorySection(container, data);
    this.updateAmountSection(container, data);
    this.updateDateTimeSection(container, data);
  },

  updateCategorySection(container, data) {
    const categorySection = container.querySelector('[data-category-section]');
    if (!categorySection) return;
    if (!data.icon && !data.category) return;

    categorySection.innerHTML = `
      ${data.category.icon ?
          `<img 
            src="${data.category.icon}" 
            alt="${data.category} icon"
            width="24"
            height="24"
            loading="lazy"
          />` :  ''
        }
      <span class="text-text-tertiary text-base mobile:text-lg laptop:text-xl">
        ${data.category.text}
      </span>
    `;
  },

  updateAmountSection(container, data) {
    const amountSection = container.querySelector('[data-amount-section]');
    if (!amountSection) return;

    const parts = [];

    if (data.transactionType) {
      const icon = data.transactionType === "income" ? IncomeIcon : ExpenseIcon;
      parts.push(`
        <img 
          src="${icon}"  
          alt="${data.transactionType} icon"
          width="24"
          height="24"
          title="${data.transactionType}"
          loading="lazy"
        />
      `);
    }

    if (data.currency) {
      parts.push(`
        <span class="text-text-tertiary text-base mobile:text-lg laptop:text-xl">${data.currency}</span>
      `);
    }

    if (data.amount) {
      parts.push(`
        <span class="text-text-tertiary text-base mobile:text-lg laptop:text-xl">${data.amount}</span>
      `);
    }

    amountSection.innerHTML = parts.length > 0
      ? parts.join('')
      : '';
  },

  updateDateTimeSection(container, data) {
    const dateTimeSection = container.querySelector('[data-datetime-section]');
    if (!dateTimeSection) return;

    const topRowParts = [];
    if (data.transactionPlace) {
      topRowParts.push(`<span class="text-text-tertiary">${data.transactionPlace}</span>`);
    }
    if (data.date)  {
      topRowParts.push(`<span class="text-text-tertiary">${data.date}</span>`);
    }

    const bottomRowParts = [];
    if (data.time) {
      bottomRowParts.push(`<span class="text-text-tertiary">${data.time}</span>`);
    }

    if (!topRowParts.length && !bottomRowParts.length)  return;
    let html = '';
    if (topRowParts.length > 0) {
      html += `<div class="flex flex-row gap-sm items-center">${topRowParts.join('')}</div>`;
    }
    if (bottomRowParts.length > 0) {
      html += `<div class="flex flex-row gap-sm items-center">${bottomRowParts.join('')}</div>`;
    }

    dateTimeSection.innerHTML = html;
  },

  initPreviewTransaction() {
    setTimeout(() => {
      this.updatePreview();
    }, 100);

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-value]') || e.target.closest('[data-button-id]')) {
        setTimeout(() => this.updatePreview(), 50);
      }
    });

    document.addEventListener('input', (e) => {
      if (e.target.matches('[data-amount], [data-note]')) {
        setTimeout(() => this.updatePreview(), 50);
      }
    });

    document.addEventListener('change', (e) => {
      setTimeout(() => this.updatePreview(), 50);
    });
  }
};

export default DetailButtonsRender;