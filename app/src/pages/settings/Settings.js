import { PageTemplate, ThemeAndColors  } from "./Index.js";

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
