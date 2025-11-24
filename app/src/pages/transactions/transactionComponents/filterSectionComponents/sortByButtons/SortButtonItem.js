const SortButtonItem = {
  render(button) {
    return `
      <li>
        ${button.render()}
      </li>
    `;
  }
};

export default SortButtonItem;

// sort-button is used for class-based binding