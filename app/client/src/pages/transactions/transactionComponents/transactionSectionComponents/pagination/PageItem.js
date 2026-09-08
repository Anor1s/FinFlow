const PageItem = {
  render(isActive, pageNum) {
    return `
      <li class="flex items-center justify-center">
        <button
          class="w-[30px]  h-[30px] relative rounded-full transition-colors duration-200 
                 ${isActive ? 'bg-surface-secondary text-text-tertiary hover:bg-surface-secondary-response'
                            : 'bg-surface hover:bg-surface-response'}"
          type="button"
          data-action="page"
          data-page="${pageNum}"
          aria-label="Page ${pageNum + 1}"
          ${isActive ? 'aria-current="page"' : ''}
        >
          <span class="flex items-center justify-center w-full h-full">
            ${pageNum + 1}
          </span>
        </button>
      </li>    
    `
  }
};

export default PageItem;