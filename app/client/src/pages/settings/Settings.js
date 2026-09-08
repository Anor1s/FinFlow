import { PageTemplate, ThemeAndColors, OtherSection  } from "./index.js";

const Settings = {
  render() {
    return PageTemplate.render([
      ThemeAndColors.render(),
      OtherSection.render(),
    ], false);
  },

  init() {
    ThemeAndColors.init();
    OtherSection.init();
  }
};

export default Settings;
