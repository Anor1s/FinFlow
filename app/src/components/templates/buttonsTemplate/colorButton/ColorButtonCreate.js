import { setCSSGradient } from "../../../other/GetAndSetCss.js";

const ColorButtonCreate = {
  render(buttonConfig) {
    return `
      <button
        class="h-full w-full border-3 rounded-full"
        style="color: ${buttonConfig.colorFirst}; border-color: currentColor"
        title="Color scheme: ${buttonConfig.colorName}"
        type="button"
        aria-pressed="false"
        aria-label="Color scheme ${buttonConfig.colorName}"
        id="${buttonConfig.buttonId}"
        data-color-first="${buttonConfig.colorFirst}"
        data-color-second="${buttonConfig.colorSecond}"
        data-color-name="${buttonConfig.colorName}"
      >       
      </button>
    `
  },

  init(buttonConfig) {
    const button = document.getElementById(buttonConfig.buttonId);
    if (!button) return;

    const setColorScheme = (colorName, colorFirst, colorSecond) => {
      setCSSGradient('primary', colorFirst, colorSecond);

      document.querySelectorAll('[id$="-theme-color-button"]').forEach(button => {
        const isActive = button.dataset.colorName === colorName;
        button.classList.toggle('theme-and-colors-active', isActive);
        button.setAttribute('aria-pressed', isActive.toString());
      });

      localStorage.setItem('colorScheme', colorName);
      localStorage.setItem('colorFirst', colorFirst);
      localStorage.setItem('colorSecond', colorSecond);
    };

    const savedColorScheme = localStorage.getItem('colorScheme');
    const allColorButtons = document.querySelectorAll('[id$="-theme-color-button"]');

    allColorButtons.forEach(button => {
      const isActive = button.dataset.colorName === savedColorScheme;
      button.classList.toggle('theme-and-colors-active', isActive);
      button.setAttribute('aria-pressed', isActive.toString());
    });

    button.addEventListener("click", () => {
      setColorScheme(buttonConfig.colorName, buttonConfig.colorFirst, buttonConfig.colorSecond);
    });
  }
};

export default ColorButtonCreate;