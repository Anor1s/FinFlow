const ColorButtonsItem = {
  render(button) {
    return `
      <li class="h-[40px] w-[40px]">
        ${button.render()}  
      </li>
    `
  }
};

export default ColorButtonsItem;