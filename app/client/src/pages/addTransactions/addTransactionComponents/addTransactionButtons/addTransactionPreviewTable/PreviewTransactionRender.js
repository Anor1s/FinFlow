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

  getCurrencySymbol(currencyCode) {
    let displaySymbol = '';
    switch (currencyCode?.toUpperCase()) {
      case 'USD': displaySymbol = '$'; break;
      case 'UAH': displaySymbol = '₴'; break;
      case 'EUR': displaySymbol = '€'; break;
      default: displaySymbol = currencyCode || '';
    }
    return displaySymbol;
  },

  updatePreview() {
    const previewElement = document.querySelector('[data-preview-transaction]');

    if (!previewElement) return;

    this.transactionData = DetailButtonsGetData();
    this.updatePreviewElements(previewElement, this.transactionData);
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
            class="icon"
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
      const currencySymbol = this.getCurrencySymbol(data.currency);
      parts.push(`
        <span class="text-text-tertiary text-base mobile:text-lg laptop:text-xl">
          ${currencySymbol}
        </span>
      `);
    }

    if (data.amount) {
      parts.push(`
        <span class="text-text-tertiary text-base mobile:text-lg laptop:text-xl">
          ${data.amount}
        </span>
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
    this.updatePreview();

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-value]') || e.target.closest('[data-button-id]')) {
        setTimeout(() => this.updatePreview(), 50);
      }
    });

    document.addEventListener('input', (e) => {
      const target = e.target;

      if (
        target.closest('[data-amount]') ||
        target.closest('[data-note]') ||
        target.closest('.datetime-input')
      ) {
        this.updatePreview();
      }
    });
  }
};

export default DetailButtonsRender;