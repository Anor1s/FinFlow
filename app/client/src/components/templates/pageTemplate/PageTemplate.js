const PageTemplate = {
  render(pageSections, threeColumns = true) {
    const layoutClass = threeColumns
      ? "laptop:flex-row"
      : "laptop:flex-col laptop:w-1/2"

    return `
      <div class="w-full p-[16px] flex flex-col tablet:px-[24px] gap-base laptop:h-full ${layoutClass}">
         ${pageSections.join('\n')}
      </div>            
    `
  }
}

export default PageTemplate;