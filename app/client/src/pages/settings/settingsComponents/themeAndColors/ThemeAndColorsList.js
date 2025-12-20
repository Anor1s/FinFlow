import { ThemeButtons, ColorButtonsList, ColorButtonsData } from "../../index.js";

const ThemeAndColorsList = {
  render() {
    return `
     <div class="flex flex-col mobile:flex-row laptop:w-1/2 gap-base">
      ${ThemeButtons.render()}
      ${ColorButtonsList.render(ColorButtonsData)}
     </div>
    `
  },

  init() {
    ThemeButtons.init();
    ColorButtonsList.init(ColorButtonsData);
  }
};

export default ThemeAndColorsList;