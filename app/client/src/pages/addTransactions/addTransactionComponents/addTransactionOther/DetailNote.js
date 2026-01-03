const NoteTextarea = {
  render() {
    return `
      <div class="h-full flex flex-col gap-xs">
        <span class="text-base text-text-primary">Note</span>
        <textarea
          class="h-full w-full bg-surface resize-none rounded text-text-tertiary p-[16px]"
          placeholder="Add a note about this transaction..."
          autocomplete="off"
          id="noteTextArea"
          data-preview-note
        ></textarea>
      </div>
    `
  },

  getValue() {
    const textarea = document.getElementById('noteTextArea');
    return textarea ? textarea.value.trim() : '';
  }
};

export default NoteTextarea;