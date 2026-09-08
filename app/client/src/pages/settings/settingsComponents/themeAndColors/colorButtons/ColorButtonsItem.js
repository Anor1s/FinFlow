const ColorButtonsItem = {
  render(button) {
    return `
      <li class="my-auto h-[30px] w-[30px]">
        ${button.render()}  
      </li>
    `
  }
};

export default ColorButtonsItem;