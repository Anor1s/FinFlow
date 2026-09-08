const AddTransactionButton = {
  render(ButtonConfig) {
    const icon = ButtonConfig.icon
      ? `<img 
          class="group-hover:icon-hover icon  transition-all duration-200"
          src="${ButtonConfig.icon}"
          alt="icon"
          height="28px"
          width="28px"
          loading="lazy"
        />`
      : ''

    const buttonType = ButtonConfig.buttonType
      ? ButtonConfig.buttonType
      : 'button'

    return`
      <button
        class="h-full w-full relative text-text-tertiary text-2xl z-30 min-h-[50px] max-h-[60px]
             gradient-primary transition-colors duration-200 ease-in-out
             before:content-[''] before:absolute before:inset-[2px] before:-z-10
             before:bg-background rounded hover:text-text-secondary
             before:transition-all before:duration-200 before:rounded-sm
             hover:before:bg-transparent group"
        type="${buttonType}"
        aria-label="${ButtonConfig.ariaLabel}"
        title="${ButtonConfig.title}"
        data-action="${ButtonConfig.action}"
        role="${buttonType}"
        id="${ButtonConfig.id}"
      > 
        <div class="flex flex-row justify-center gap-base">
          ${ButtonConfig.text}
          ${icon}
        </div>
        
      </button>
    `
  }
};

export default AddTransactionButton;