const SelectButtonItem = {
  render(item) {
    return `
      <li class="divide-y-1 py-1 divide-border">
        <button
          data-value="${item.value}"
          class="pointer hover:bg-surface-secondary-response flex flex-row gap-base items-center
          active:bg-surface-secondary-response option-btn w-full min-h-[40px] 
          px-[16px] text-left text-text-primary"
          role="option"
          aria-selected="false"
        >
          <img
            data-icon-link
            src="${item.icon}"
            alt="icon"
            width="24"
            height="24"
            loading="lazy"
            aria-hidden="true"
          />
          <span class="text-center">${item.text}</span>
        </button>
      </li>
    `;
  }
};

export default SelectButtonItem;