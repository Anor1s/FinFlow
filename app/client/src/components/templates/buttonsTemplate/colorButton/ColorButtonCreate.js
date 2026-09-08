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

    const updateActiveState = (activeName) => {
      const allColorButtons = document.querySelectorAll('[id$="-theme-color-button"]');
      allColorButtons.forEach(btn => {
        const isActive = btn.dataset.colorName === activeName;
        btn.classList.toggle('theme-and-colors-active', isActive);
        btn.setAttribute('aria-pressed', isActive.toString());
      });
    };

    const savedColorScheme = localStorage.getItem('colorScheme');
    if (savedColorScheme) {
      updateActiveState(savedColorScheme);
    }

    button.addEventListener("click", () => {
      const { colorName, colorFirst, colorSecond } = buttonConfig;

      setCSSGradient('primary', colorFirst, colorSecond);
      updateActiveState(colorName);

      localStorage.setItem('colorScheme', colorName);
      localStorage.setItem('colorFirst', colorFirst);
      localStorage.setItem('colorSecond', colorSecond);
    });
  }
};

export default ColorButtonCreate;