const LinkButtonCreate = {
  render(ButtonConfig) {
    return `
      <div class="w-full text-text-primary flex flex-row gap-sm">
        ${ButtonConfig.text}
        <a  
          class="h-full capitalized text-text-tertiary border-b-[2px] "
          href="${ButtonConfig.link}"
        > 
         <div class="w-fit flex flex-row gap-sm">
            ${ButtonConfig.buttonText}
            <img 
              class=""
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