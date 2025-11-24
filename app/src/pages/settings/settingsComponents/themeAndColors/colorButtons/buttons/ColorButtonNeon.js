import { ColorButtonCreate, getCSSVariable } from '../../../../index.js'

const ButtonConfig = {
  colorName: 'neon',
  colorFirst: getCSSVariable('--gradient-neon-first'),
  colorSecond: getCSSVariable('--gradient-neon-second'),
  buttonId: 'neon-theme-color-button',
};

const ColorButtonNeon = {
  render() {
    return ColorButtonCreate.render(ButtonConfig)
  },

  init() {
    ColorButtonCreate.init(ButtonConfig);
  }
};

export default ColorButtonNeon;