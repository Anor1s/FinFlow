const Item = {
  render(item) {
    return `
      <li 
        class="flex gradient-secondary rounded-2xl flex-1  px-[32px] py-[8px] 
              mobile:min-h-[120px] laptop:min-h-[80px] "
        >
        <div class="flex flex-row items-center justify-between w-full relative">
          <div class="flex flex-col z-20 gap-xs">
            <span class="text-xl">${item.heading}</span>
            <span class="text-2xl font-bold text-text-tertiary">
              <span>${item.currency}</span>${item.value.toLocaleString('uk-UA')}
            </span>
          </div>
         
          <div class="absolute right-0 w-[45px] h-[45px]">
            <div class="absolute inset-0 gradient-primary opacity-icon" 
                  style=" -webkit-mask: url('${item.icon}') no-repeat center / contain;
                  mask: url('${item.icon}') no-repeat center / contain;"
            >
            </div>
            <img
              class="w-full h-full relative z-10 mix-blend-overlay"
              src="${item.icon}"
              height="45"
              width="45"
              loading="lazy"
              aria-hidden="true"
            />
          </div>
        </div>
      </li>
    `;
  }
};

export default Item;

