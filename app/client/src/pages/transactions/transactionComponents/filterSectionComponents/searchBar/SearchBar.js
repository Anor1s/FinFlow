import { SearchIcon } from '../../../index.js'

const SearchBar = {
  render() {
    const html = `
      <div class="h-full w-full justify-between flex flex-row  min-h-button  
                       laptop:h-full  rounded-full bg-surface"
        role="search"
      >
        <input 
          class=" min-h-button w-full hover:bg-surface-response active:bg-surface-response  
                rounded-full  bg-surface pl-[16px] 
                placeholder-text-primar rounded-r  text-text-tertiary "
          type="search" 
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="search-button"
          id="search-input"
        >
        <button  
          class="px-[16px] mobile:px-[32px]  group hover:bg-surface-response active:bg-surface-response
                 border-l-[2px] rounded-l rounded-full
                 border-border focus:rounded-l focus:rounded-full"
          type="button"
          aria-label="Perform search"
          title="Search"
          id="search-button"
        >
          <img
            class="group-hover:icon-hover icon transition-all duration-200"
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
    `;

    requestAnimationFrame(() => this.init());

    return html;
  },

  init() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (searchInput) {
      let searchTimeout;

      searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          if (window.updateTransactionFilters) {
            window.updateTransactionFilters();
          }
        }, 200);
      });

      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          if (window.updateTransactionFilters) {
            window.updateTransactionFilters();
          }
        }
      });
    }

    if (searchButton) {
      searchButton.addEventListener('click', () => {
        if (window.updateTransactionFilters) {
          window.updateTransactionFilters();
        }
      });
    }
  },

  getValue() {
    const searchBar = document.getElementById('search-input');
    return searchBar ? searchBar.value : '';
  }
};

export default SearchBar;