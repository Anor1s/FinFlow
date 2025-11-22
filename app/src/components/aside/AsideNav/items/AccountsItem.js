const AccountsItem = {
  render(item) {
    return `
      <li>
        <a 
          href="${item.href}" 
          class="laptop:bg-surface radient-hover hover:bg-transparent 
                group flex items-center laptop:py-[8px] laptop:px-[16px] 
                rounded-lg pointer
                gap-sm" data-link
          >
           <img
            class="rounded-full aspect-squar tablet:w-[70px] tablet:h-[70px] laptop:h-[45px] laptop:w-[45px]" 
            src="${item.icon}"
            alt="${item.alt}"
            width="45"
            height="45"
            loading="lazy"
            aria-hidden="true"
          />
          <span 
            class=" group-hover:text-black transition-colors duration-200 
                   hidden laptop:block "
            >
            ${item.text}
          </span>
        </a>
      </li>
    `;
  }
};

export default AccountsItem;