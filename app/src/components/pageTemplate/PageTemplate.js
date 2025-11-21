const PageTemplate = {
  render(pageSections) {
    return `
      <div class="w-full p-[16px] flex flex-col tablet:px-[24px] gap-base
                   laptop:h-full laptop:flex-row"
      >
         ${pageSections.join('\n')}
      </div>            
    `
  }
}

export default PageTemplate;