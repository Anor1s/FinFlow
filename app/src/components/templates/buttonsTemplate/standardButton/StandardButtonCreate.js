const AddTransactionButton = {
  render(ButtonConfig) {
    return`
      <button
        class="h-full relative text-text-tertiary text-2xl z-30 min-h-button max-h-[80px]
             gradient-primary transition-all duration-200 ease-in-out
             before:content-[''] before:absolute before:inset-[2px] before:-z-10
             before:bg-background rounded hover:text-text-secondary
             before:transition-all before:duration-200 before:rounded-sm
             hover:before:bg-transparent"
        type="button"
        aria-label="${ButtonConfig.ariaLabel}"
        title="${ButtonConfig.title}"
        data-action="${ButtonConfig.action}"
        role="button"
      >
        ${ButtonConfig.text}
      </button>
    `
  }
};

export default AddTransactionButton;