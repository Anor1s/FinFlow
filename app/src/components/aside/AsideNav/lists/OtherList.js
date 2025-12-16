import { AsideNavItem, OtherItemsData } from '../../Index.js';




const OtherList = {
  render() {
    return `
       <div class="w-full">
        <h3 class="w-full text-center laptop:text-start uppercase mb-[8px] font-bold">Other</h3>
        <ul class="flex flex-col justify-center items-center 
                   laptop:items-stretch gap-base laptop:w-full">
          ${OtherItemsData.map(item => AsideNavItem.render(item)).join('\n')}
        </ul>
      </div>
    `;
  }
};

export default OtherList;

