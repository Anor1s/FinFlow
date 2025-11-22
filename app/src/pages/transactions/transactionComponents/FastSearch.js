import { SectionHeading, SearchIcon } from '../index.js'

const CashStatus = {
  render() {
    return `
      <section class="h-full  w-full flex flex-col 
                      mobile:h-full gap-base"        
      > 
        <div class="flex  flex-col gap-sm">
          ${SectionHeading.render('Fast Search')}
          <div class="max-h-[40px]  w-full justify-between flex flex-row   
                       laptop:h-full rounded-full bg-surface"
               role="search"
          >
            <input 
              class=" min-h-[40px] max-h-[40px] w-full hover:bg-surface-response active:bg-surface-response  rounded-full  bg-surface pl-[16px] 
                    placeholder-text-primar rounded-r y text-text-tertiary "
              type="search" 
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="search-button"
              id="search-input"
            >
            <button  
              class="px-[16px]  group hover:bg-surface-response active:bg-surface-response
                     border-l-[2px] rounded-l rounded-full
                     border-border focus:rounded-l focus:rounded-full"
              type="button"
              aria-label="Perform search"
              title="Search"
              id="search-button"
            >
              <img
                class="group-hover:brightness-0 
                       transition-colors 
                       duration-200 "  
                data-icon-link
                src="${SearchIcon}"
                alt="icon"
                width="24"
                height="24"
                loading="lazy"
                aria-hidden="true"
              />
            </button>
            </div> 
        </div>
      </section>
    `;
  }
};

export default CashStatus;

