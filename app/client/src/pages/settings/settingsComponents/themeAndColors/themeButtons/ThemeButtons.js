const ThemeButtons = {
  render() {
    return `
      <div class="flex flex-col gap-xs w-full">
        <span class="" id="theme-label">Theme</span> 
        <ul 
          class="flex flex-row gap-sm bg-surface w-full px-[8px] mobile:px-[16px] h-button rounded" 
          role="group" 
          aria-labelledby="theme-label">
          <li class="my-auto h-[30px] w-[30px]">
            <button
              class="h-full w-full theme-button theme-active border-3 rounded-full text-black border-black"
              id="dark-theme-button"
              title="Dark Theme"
              type="button"
              aria-pressed="true"
              aria-label="Dark theme"
            >
            </button>
          </li>
    
          <li class="my-auto h-[30px] w-[30px]">
            <button
              class="h-full w-full theme-button border-3 rounded-full text-white border-white"
              id="light-theme-button"
              title="Light Theme"
              type="button"
              aria-pressed="false"
              aria-label="Light theme"
            >
            </button>
          </li>
        </ul>
      </div>
    `;
  },

  init() {
    const HTML = document.documentElement;
    const DarkThemeButton = document.getElementById('dark-theme-button');
    const LightThemeButton = document.getElementById('light-theme-button');

    if (!DarkThemeButton || !LightThemeButton) return;

    function DarkThemeActive() {
      HTML.classList.add('dark-theme');
      DarkThemeButton.classList.add('theme-and-colors-active');
      LightThemeButton.classList.remove('theme-and-colors-active');
      DarkThemeButton.setAttribute('aria-pressed', 'true');
      LightThemeButton.setAttribute('aria-pressed', 'false');;
    }

    function LightThemeActive() {
      HTML.classList.remove('dark-theme');
      LightThemeButton.classList.add('theme-and-colors-active');
      DarkThemeButton.classList.remove('theme-and-colors-active');
      LightThemeButton.setAttribute('aria-pressed', 'true');
      DarkThemeButton.setAttribute('aria-pressed', 'false');
    }

    const setTheme = (isDark) => {
      if (isDark) {
        DarkThemeActive()
      } else {
        LightThemeActive()
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    const isDarkThemeActive = HTML.classList.contains('dark-theme');

    if (isDarkThemeActive) {
      DarkThemeActive()
    } else {
      LightThemeActive()
    }

    DarkThemeButton.addEventListener('click', () => {
      setTheme(true);
    });

    LightThemeButton.addEventListener('click', () => {
      setTheme(false);
    });
  }
};

export default ThemeButtons;