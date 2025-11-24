const NavItem = {
  render(item) {
    return `
      <li class="w-full">
        <a 
          href="${item.href}" 
          class="group flex justify-center laptop:justify-start items-center p-[8px] rounded-lg pointer w-full
                gradient-hover laptop:gap-sm desktop:gap-[16px]" 
          data-link
          >
          <img
            class="group-hover:brightness-0 tablet:w-[32px] tablet:h-[32px] laptop:h-[24px] laptop:w-[24px]"  
            data-icon-link
            src="${item.icon}"
            alt="${item.alt}"
            width="24"
            height="24"
            loading="lazy"
            aria-hidden="true"
          />
          <span 
            class="group-hover:text-black transition-colors duration-200 
                    hidden laptop:block  "
          >
            ${item.text}
          </span>
        </a>
      </li>
    `;
  }
};

export default NavItem;