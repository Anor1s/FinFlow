import { SectionHeading, StandardCurrencyButton } from '../index.js'

const OtherSection = {
  render() {
    return `
      <section class="h-fit w-full flex flex-col gap-sm"> 
          ${SectionHeading.render('Other')}
          ${StandardCurrencyButton.render()}
      </section>
    `
  },

  init() {
    StandardCurrencyButton.init();
  }
};

export default OtherSection;