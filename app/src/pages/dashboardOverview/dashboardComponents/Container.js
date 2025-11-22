const Container   = {
  render(pageSections) {
    return `
      <div class="h-full w-full flex flex-col gap-base mobile:h-include-top
                    laptop:h-full laptop:flex-row  "
      >
        ${pageSections.join('\n')}
      </div>
    `;
  }
};

export default Container;