import { HidePasswordIcon, ShowPasswordIcon } from "../../index.js";

const PasswordInput = {
  render(inputId, buttonId) {
    return `
      <label for="${inputId}" class="text-lg text-text-primary">
        Password
      </label>
      <div class="relative w-full box-border">
        <input
          class="h-button w-full pl-[16px] pr-[48px] bg-surface text-base rounded text-text-tertiary  border-2 border-surface-secondary  box-border"
          type="password"
          id="${inputId}"
          placeholder="Enter your password"
          minlength="8"
          name="password"
          autocomplete="new-password" 
        />
        <button  
          class="absolute right-0 top-0 h-full w-[40px] flex items-center justify-center"
          id="${buttonId}"
          type="button"
          aria-label="Toggle password visibility"
        >
        </button>
      </div>
      <div class="text-text-accent text-base" id="${inputId}Error"></div>
    `
  },

  init(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    const createIcon = (iconPath, altText) => {
      return `
        <img 
          src="${iconPath}" 
          alt="${altText}"
          width="28" 
          height="28" 
          loading="lazy" 
        />`
    };

    const updateButton = () => {
      const isPasswordHidden = input.type === 'password';
      const icon = isPasswordHidden ? ShowPasswordIcon : HidePasswordIcon;
      const altText = isPasswordHidden ? 'Show password' : 'Hide password';

      button.innerHTML = createIcon(icon, altText);
      button.setAttribute('aria-label', altText);
      button.setAttribute('title', altText);
    };

    button.addEventListener('click', () => {
      input.type = input.type === 'password' ? 'text' : 'password';
      updateButton();

      setTimeout(() => {
        input.focus();
      }, 100);
    });

    updateButton();
  }
};

export default PasswordInput;