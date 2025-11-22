import  { AsideLogo, AsideNav } from '.';


const Aside = {
  render() {
    return `
      <aside 
        class="h-full fixed left-0 top-0 z-30 w-[75px] p-[16px] laptop:px-[32px]
              border-r border-surface
              tablet:w-[150px] laptop:w-[240px] desktop:w-[325px] text-sm 
              tablet:text-base desktop:text-2xl"
        >
        <div 
          class="flex flex-col justify-between h-full gap-[40px] tablet:gap-[30px] 
          ">
          ${AsideLogo.render()}
          ${AsideNav.render()}
        </div>
      </aside>
    `;
  },
};

export default Aside;


