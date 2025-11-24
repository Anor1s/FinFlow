import {
  SectionHeading,
  DetailButtonsList,
  DetailButtonsData,
  PreviewTransaction,
  NoteTextarea,
  DetailButtonsRender,
  AddTransactionButton,

  initDetailButtons,
} from '../index.js'

const AddTransactionDetails = {
  render() {
    return `
      <section class="h-full mobile:h-incule-top w-full laptop:w-1/2 flex flex-col gap-base">
        ${SectionHeading.render('Transaction Details')}
        ${DetailButtonsList.render(DetailButtonsData)}
        ${NoteTextarea.render()}
        ${PreviewTransaction.render()}
        ${AddTransactionButton.render()}
      </section>
    `
  },

  init() {
    initDetailButtons();

    setTimeout(() => {
      DetailButtonsRender.initPreviewTransaction();
    }, 200);
  }
};

export default AddTransactionDetails;


//   ${NoteTextarea.render()}