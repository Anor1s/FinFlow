const PaginationButtonsList = {
  render(pageButtons) {
    return`
      <ul class="h-button w-full flex flex-row justify-between items-center" data-pagination="true">
        <li class="h-full w-[40px] laptop:w-[45px]">
          <button
            class="h-full w-full flex items-center justify-center bg-surface 
                  hover:bg-surface-response rounded transition-colors duration-200 
                  ${this.currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}"
            type="button"
            data-action="prev"
            ${this.currentPage === 0 ? 'disabled' : ''}
            aria-label="Previous page"
          >
            <svg
              class="w-5 h-5 text-text-primary transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>  
          </button>
        </li>
        
        <div class="flex items-center justify-center gap-base">
          ${pageButtons}
        </div>
        
        <li class="h-full w-[40px] laptop:w-[45px]">
          <button
            class="h-full w-full flex items-center justify-center bg-surface 
                  hover:bg-surface-response rounded transition-colors duration-200 
                  ${this.currentPage >= this.totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}"
            type="button"
            data-action="next"
            ${this.currentPage >= this.totalPages - 1 ? 'disabled' : ''}
            aria-label="Next page"
          >
            <svg
              class="w-5 h-5 text-text-primary transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>  
          </button>
        </li>
      </ul>
    `
  }
};

export default PaginationButtonsList;