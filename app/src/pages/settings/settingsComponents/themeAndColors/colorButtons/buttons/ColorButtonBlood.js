import { ColorButtonCreate, getCSSVariable } from '../../../../index.js'

const ButtonConfig = {
  colorName: 'blood',
  colorFirst: getCSSVariable('--gradient-blood-first'),
  colorSecond: getCSSVariable('--gradient-blood-second'),
  buttonId: 'blood-theme-color-button',
};

const ColorButtonBlood = {
  render() {
    return ColorButtonCreate.render(ButtonConfig)
  },

  init() {
    ColorButtonCreate.init(ButtonConfig);
  }
};

export default ColorButtonBlood;