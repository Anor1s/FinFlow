import { ThemeButtons, ColorButtonsList, ColorButtonsData, InitManagerCreate, InitManagerClear } from "../../index.js";

const ThemeAndColorsList = {
  render() {
    InitManagerClear(ColorButtonsData)

    return `
     <div class="flex flex-col mobile:flex-row gap-base">
      ${ThemeButtons.render()}
      ${ColorButtonsList.render(ColorButtonsData)}
     </div>
    `
  },

  init() {
    InitManagerCreate(ColorButtonsData);
    ThemeButtons.init();
  }
};

export default ThemeAndColorsList;