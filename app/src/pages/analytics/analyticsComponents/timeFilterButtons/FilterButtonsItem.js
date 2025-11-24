const FilterButtonsItem = {
  render(buttonComponent) {
    return `
      <li>
        ${buttonComponent.render()}
      </li>
    `;
  }
};

export default FilterButtonsItem;