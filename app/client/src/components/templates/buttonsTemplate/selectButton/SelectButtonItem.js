const SelectButtonItem = {
  render(item) {
    const icon = (item.text.toLowerCase() === 'select option' || !item.icon)
      ? ''
      : `<img
            data-icon-link
            class="my-auto"
            src="${item.icon}"
            alt="icon"
            width="24"
            height="24"
            loading="lazy"
            aria-hidden="true"
          />` ;

    return `
      <li class="divide-border py-[4px] min-h-button overflow-hidden">
        <button
          class="h-full pointer hover:bg-surface-secondary-response flex flex-row gap-sm items-start
                active:bg-surface-secondary-response option-btn w-full  
                px-[16px] text-left text-text-primary group "
          role="option"
          aria-selected="false"
          data-value="${item.value}"
        >
          ${icon}
          <span class="min-h-[40px] flex items-center group-hover:text-text-tertiary 
                       transition-color duration-200 break-words  line-clamp-2">
            ${item.text}
          </span>
        </button>
      </li>
    `;
  }
};

export default SelectButtonItem;