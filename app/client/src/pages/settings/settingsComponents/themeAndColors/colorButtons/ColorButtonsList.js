import { ColorButtonsItem } from "../../../index.js";

const ColorButtonsList = {
  render(buttonsArray) {
    return`
      <div class="flex flex-col gap-xs w-full ">  
        <span class="" id="colors-label">Colors</span> 
        <ul 
          class="flex flex-row gap-sm bg-surface w-full px-[8px] mobile:px-[16px] h-button rounded" 
          role="group" 
          aria-labelledby="colors-label"
        >
          ${buttonsArray.map(button => ColorButtonsItem.render(button)).join('\n')}
        </ul>
      </div>
    `;
  },
};

export default ColorButtonsList;