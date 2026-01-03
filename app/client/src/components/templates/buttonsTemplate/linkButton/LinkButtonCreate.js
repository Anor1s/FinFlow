const LinkButtonCreate = {
  render(ButtonConfig) {
    return `
      <div class="w-full text-text-primary flex flex-row gap-sm justify-center">
        ${ButtonConfig.text}
        <a  
          class="hover:border-[var(--gradient-primary-first)] px-[8px] rounded-lg h-full capitalized text-text-tertiary border-b-[2px] transition-colors duration-200"
          href="${ButtonConfig.link}"
          id="${ButtonConfig.id}"
        > 
         <div class="w-fit flex flex-row gap-sm">
            ${ButtonConfig.buttonText}
            <img 
              class=" icon"
              src="${ButtonConfig.icon}"
              alt="icon"
              width="16"
              height="16"
              loading="lazy"
            /> 
          </div>
        </a>
       </div>
    `
  }
};

export default LinkButtonCreate;