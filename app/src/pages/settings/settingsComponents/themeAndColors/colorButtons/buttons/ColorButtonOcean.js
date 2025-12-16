import { ColorButtonCreate, getCSSVariable } from '../../../../index.js'

const ButtonConfig = {
  colorName: 'ocean',
  colorFirst: getCSSVariable('--gradient-ocean-first'),
  colorSecond: getCSSVariable('--gradient-ocean-second'),
  buttonId: 'ocean-theme-color-button',
};

const ColorButtonOcean = {
  render() {
    return ColorButtonCreate.render(ButtonConfig)
  },

  init() {
    ColorButtonCreate.init(ButtonConfig);
  }
};

export default ColorButtonOcean;