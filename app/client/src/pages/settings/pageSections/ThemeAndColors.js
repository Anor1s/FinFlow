import { SectionHeading, ThemeAndColorsList } from '../index.js'

const ThemeAndColors = {
  render() {
    return `
      <section class="h-fit w-full flex flex-col gap-sm"> 
          ${SectionHeading.render('Theme & Colors')}
          ${ThemeAndColorsList.render()}
      </section>
    `
  },

  init() {
    ThemeAndColorsList.init();
  }
};

export default ThemeAndColors;