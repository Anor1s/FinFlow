const Header = {
  render(title) {
    return `
      <header 
        class="gradient-primary text-black  min-h-[80px]
               z-20 ml-[75px] tablet:ml-[150px] laptop:ml-[240px]
               desktop:ml-[325px] "
        >
          <div class="flex items-center h-full ">
              <h2 class="text-2xl font-bold ml-[16px] tablet:ml-[24px]">
                ${title}
              </h2>
          </div>
      </header>
    `;
  },
};

export default Header;