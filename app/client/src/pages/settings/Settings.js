import { PageTemplate, ThemeAndColors  } from "./index.js";

const Settings = {
  render() {
    return PageTemplate.render([
      ThemeAndColors.render(),
    ]);
  },

  init() {
    ThemeAndColors.init();
  }
};

export default Settings;
