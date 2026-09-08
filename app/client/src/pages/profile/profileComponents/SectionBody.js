const SectionBody = {
  render(sectionParts) {
    return `
      <section class="h-full mobile:h-include-top w-full flex items-center justify-center">
        <div 
          class="flex items-center justify-center flex-col gap-base w-full mobile:w-[70dvw] laptop:w-1/3
                    p-[16px] rounded-lg gradient-secondary"
          >
           ${sectionParts.join('\n')}
        </div>
      </section>
    `
  }
};

export default SectionBody;


