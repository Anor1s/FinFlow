import { AsideNavItem, MenuItemsData } from '../../Index.js';

const MenuList = {
  render() {
    return `
      <div class=" w-full">
        <h3 class="w-full text-center laptop:text-start uppercase mb-[8px] font-bold">Menu</h3>
        <ul class="flex flex-col justify-center gap-base w-full">
          ${MenuItemsData.map(item => AsideNavItem.render(item)).join('\n')}
        </ul>
      </div>
    `;
  }
};

export default MenuList;
