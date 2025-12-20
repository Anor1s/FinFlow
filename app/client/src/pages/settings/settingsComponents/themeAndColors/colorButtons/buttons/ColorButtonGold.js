import { ColorButtonCreate, getCSSVariable } from '../../../../index.js'

const ButtonConfig = {
  colorName: 'gold',
  colorFirst: getCSSVariable('--gradient-gold-first'),
  colorSecond: getCSSVariable('--gradient-gold-second'),
  buttonId: 'gold-theme-color-button',
};

const ColorButtonGold = {
  render() {
    return ColorButtonCreate.render(ButtonConfig)
  },

  init() {
    ColorButtonCreate.init(ButtonConfig);
  }
};

export default ColorButtonGold;