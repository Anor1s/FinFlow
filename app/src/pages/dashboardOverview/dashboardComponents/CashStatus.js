import { SectionHeading, CardsList } from '../index.js'

const CashStatus = {
  render() {
    return `
      <section class="h-include-top w-full flex flex-col gap-sm 
                        mobile:h-full laptop:w-fit laptop:min-w-[270px]"
      >
        ${SectionHeading.render('Cash Status')}
        <div class="h-full w-full  flex flex-col gap-sm 
                     mobile:gap-base laptop:h-full laptop:flex-row"
        >
          ${CardsList.render()}
        </div> 
      </section>
    `;
  }
};
export default CashStatus;

