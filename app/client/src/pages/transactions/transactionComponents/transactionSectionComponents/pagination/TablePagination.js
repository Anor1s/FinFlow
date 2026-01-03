const TablePagination = {
  calculateItemsPerPage(tableElement) {
    if (!tableElement) return 0;
    const itemHeight = 78;
    const tableHeight = tableElement.offsetHeight - 32;
    return Math.max(1, Math.floor(tableHeight / itemHeight));
  },

  getPageSlice(data, currentPage, itemsPerPage) {
    const startIndex = currentPage * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }
};

export default TablePagination;