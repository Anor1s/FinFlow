import {
  SelectButtonCreate,
  CurrencyButtonData,
  UserSettingsService,
  AppStore,
  ChartStore,
  Dialog
} from '../../../index.js';

const ButtonConfig = {
  categoryName: "Standard Currency",
  buttonId: "standardCurrency",
};

const StandardCurrencyButton = {
  render() {
    return SelectButtonCreate.render(CurrencyButtonData, ButtonConfig);
  },

  async init() {
    const currentCurrency = AppStore.isInitialized
      ? AppStore.currentCurrency
      : await AppStore.fetchInitialCurrency();

    const selectedValueText = document.querySelector(`[data-button-id="${ButtonConfig.buttonId}"].selected-value`);
    const activeOption = CurrencyButtonData.find(opt => opt.value === currentCurrency) || CurrencyButtonData[0];

    if (selectedValueText) {
      selectedValueText.textContent = activeOption.text;
    }

    const dropdownMenu = document.querySelector(`[data-button-id="${ButtonConfig.buttonId}"].dropdown-menu`);
    if (dropdownMenu) {
      dropdownMenu.addEventListener('click', async (e) => {
        const option = e.target.closest('[data-value]');
        if (option) {
          const selectedValue = option.getAttribute('data-value');
          if (selectedValue) await this.updateCurrencyOnServer(selectedValue);
        }
      });
    }
  },

  async updateCurrencyOnServer(currency) {
    try {
      await UserSettingsService.updateBaseCurrency(currency);

      AppStore.setCurrency(currency);

      if (ChartStore && ChartStore.invalidate) {
        ChartStore.invalidate();
      }

      const selectedValueText = document.querySelector(`[data-button-id="${ButtonConfig.buttonId}"].selected-value`);
      const activeOption = CurrencyButtonData.find(opt => opt.value === currency);
      if (selectedValueText && activeOption) {
        selectedValueText.textContent = activeOption.text;
      }

      if (window.PriceRangeButton && window.PriceRangeButton.init) {
        window.PriceRangeButton.init();
      }

      if (window.TransactionList && window.TransactionList.refreshTableData) {
        await window.TransactionList.refreshTableData();
      }

      if (window.updateTransactionFilters) {
        setTimeout(async () => {
          await window.updateTransactionFilters();
        }, 200);
      }

    } catch (err) {
      Dialog.alert("Failed to change currency. Please check your server connection.");
      console.error(err);
    }
  }
};

export default StandardCurrencyButton;