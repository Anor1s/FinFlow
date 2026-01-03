// TableLogic.js
const TableLogic = {
  parseDateTime(dateStr, timeStr = "00:00") {
    if (!dateStr) return null;
    let normalizedDate = dateStr;
    if (dateStr.includes('.')) {
      const parts = dateStr.split('.');
      if (parts[0].length === 2) {
        normalizedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    const d = new Date(`${normalizedDate}T${timeStr}`);
    return isNaN(d.getTime()) ? null : d;
  },

  isFilteredOut(transaction, filters) {
    const amount = Number(transaction.amount);
    const min = filters.priceRangeMin;
    const max = filters.priceRangeMax;


    if (min !== undefined && min !== "" && min !== null && min > 0) {
      const absoluteAmount = Math.abs(amount);
      if (absoluteAmount < Number(min)) {
        return true;
      }
    }

    if (max !== undefined && max !== "" && max !== null && max !== Infinity) {
      const absoluteAmount = Math.abs(amount);
      if (absoluteAmount > Number(max)) {
        return true;
      }
    }

    const catVal = filters.category?.value;
    if (catVal && catVal !== "" && catVal !== "None" && catVal !== "all") {
      if (transaction.category !== catVal) {
        return true;
      }
    }

    if (filters.transactionType && filters.transactionType !== "None" && filters.transactionType !== "") {
      const transType = (transaction.transactionType || "").toLowerCase();
      const filterType = filters.transactionType.toLowerCase();
      if (transType !== filterType) {
        return true;
      }
    }

    if (filters.transactionPlace && filters.transactionPlace.trim() !== "") {
      const fPlace = filters.transactionPlace.toLowerCase().trim();
      const tPlace = (transaction.place || "").toLowerCase().trim();
      if (!tPlace.includes(fPlace)) {
        return true;
      }
    }

    const transactionDate = this.parseDateTime(transaction.date, transaction.time);
    if (transactionDate) {
      if (filters.dateTimeFrom?.date && filters.dateTimeFrom.date !== "") {
        const fromDate = this.parseDateTime(filters.dateTimeFrom.date, filters.dateTimeFrom.time || "00:00");
        if (fromDate && transactionDate < fromDate) {
          return true;
        }
      }
      if (filters.dateTimeTo?.date && filters.dateTimeTo.date !== "") {
        const toDate = this.parseDateTime(filters.dateTimeTo.date, filters.dateTimeTo.time || "23:59:59");
        if (toDate && transactionDate > toDate) {
          return true;
        }
      }
    }
    return false;
  },

  applySort(data, sort) {
    if (!data || data.length === 0) return [];

    const sortFields = [];

    const normalize = (val) => {
      const s = typeof val === 'string' ? val : val?.value;
      return s ? s.toLowerCase() : '';
    };

    const amountValue = normalize(sort.byAmount);
    const categoryValue = normalize(sort.byCategory);
    const dateTimeValue = normalize(sort.byDateTime);

    if (amountValue && !amountValue.includes('none') && amountValue !== '') {
      sortFields.push({
        field: 'amount',

        order: amountValue.includes('asc') ? 1 : -1
      });
    }

    if (categoryValue && !categoryValue.includes('none') && categoryValue !== '') {
      sortFields.push({
        field: 'category',
        order: categoryValue.includes('asc') ? 1 : -1
      });
    }

    if (dateTimeValue && !dateTimeValue.includes('none') && dateTimeValue !== '') {
      sortFields.push({
        field: 'dateTime',
        order: dateTimeValue.includes('asc') ? 1 : -1
      });
    }

    if (sortFields.length === 0) {
      sortFields.push({
        field: 'dateTime',
        order: -1
      });
    }

    if (sortFields.length === 0) return data;

    return [...data].sort((a, b) => {
      for (const { field, order } of sortFields) {
        let result = 0;
        switch(field) {
          case 'amount':
            result = (Number(a.amount) - Number(b.amount)) * order;
            break;
          case 'category':
            result = (a.category || '').localeCompare(b.category || '') * order;
            break;
          case 'dateTime':
            const dateA = this.parseDateTime(a.date, a.time)?.getTime() || 0;
            const dateB = this.parseDateTime(b.date, b.time)?.getTime() || 0;
            result = (dateA - dateB) * order;
            break;
        }
        if (result !== 0) return result;
      }
      return 0;
    });
  }
};

export default TableLogic;