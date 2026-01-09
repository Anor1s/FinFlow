const TablePagination = {
  calculateItemsPerPage(tableElement) {
    if (!tableElement) return 0;
    const itemHeight = 78;
    const padding = 32;
    const tableHeight = tableElement.offsetHeight - padding;
    return Math.max(1, Math.floor(tableHeight / itemHeight));
  }
};

export default TablePagination;