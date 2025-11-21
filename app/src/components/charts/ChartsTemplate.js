const ChartsTemplate = {
  render(chartId) {
    return `
      <div class="h-full w-full relative min-h-[290px] mobile:min-h-[400px] laptop:min-h-0 font-archiv">        
        <canvas id="${chartId}" class="absolute inset-0 gradient-secondary rounded-2xl p-[16px]"></canvas>
      </div>
    `;
  },
}

export default ChartsTemplate;