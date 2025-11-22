const FilterButtonItem = {
  render(buttonComponent) {
    return `
      <li class="">
        ${buttonComponent.render()}
      </li>
    `;
  }
};

export default FilterButtonItem;


// col-span-2