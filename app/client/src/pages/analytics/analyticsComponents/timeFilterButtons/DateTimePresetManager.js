import {DateTimeButtonCreate} from '../../index.js';

const DateTimePresetManager = {
  formatToISO(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  },

  handlePresetChange(presetValue) {
    if (!presetValue || presetValue.trim() === '') {
      this.resetDates();
      return;
    }

    const now = new Date();
    let fromDate = new Date();
    let toDate = new Date();
    now.setSeconds(0, 0);

    switch (presetValue) {
      case 'today':
        fromDate.setHours(0, 0, 0, 0);
        toDate = now;
        break;
      case 'yesterday':
        fromDate.setDate(now.getDate() - 1);
        fromDate.setHours(0, 0, 0, 0);
        toDate.setDate(now.getDate() - 1);
        toDate.setHours(23, 59, 0, 0);
        break;
      case 'lastWeek':
        fromDate.setDate(now.getDate() - 7);
        fromDate.setHours(0, 0, 0, 0);
        toDate = now;
        break;
      case 'lastMonth':
        fromDate.setMonth(now.getMonth() - 1);
        fromDate.setHours(0, 0, 0, 0);
        toDate = now;
        break;
      case 'lastYear':
        fromDate.setFullYear(now.getFullYear() - 1);
        fromDate.setHours(0, 0, 0, 0);
        toDate = now;
        break;
      case 'allTime':
        fromDate = new Date(1900, 0, 1, 0, 0);
        toDate = now;
        break;
      default:
        this.resetDates();
        return;
    }

    const fromVal = this.formatToISO(fromDate);
    const toVal = this.formatToISO(toDate);

    DateTimeButtonCreate.setValue("analyticsDateTimeFrom", fromVal);
    DateTimeButtonCreate.setValue("analyticsDateTimeTo", toVal);
  },

  resetDates() {
    DateTimeButtonCreate.setValue("analyticsDateTimeFrom", "");
    DateTimeButtonCreate.setValue("analyticsDateTimeTo", "");
  }
};

export default DateTimePresetManager;