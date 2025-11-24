const ChartsTemplate = {
  render(chartId) {
    return `
      <div data-chart-container="true" 
           data-chart-id="${chartId}"
           data-minimize-laptop-only="true"
           class="chart-container h-full w-full relative min-h-[290px] 
                 mobile:min-h-[400px] laptop:min-h-0 transition-all 
                 duration-300 ease-in-out cursor-pointer">
        <canvas 
          id="${chartId}" 
          class="absolute inset-0 gradient-secondary rounded-2xl p-[16px] transition-all duration-300"
        ></canvas>
        
        <div 
          class="laptop:block hidden absolute bottom-[-10px] right-3 text-xs 
                text-text-primary bg-background border-1 border-surface 
                px-2 py-1 rounded">
          Click to minimize
        </div>
      </div>
    `;
  }
}


document.addEventListener('click', (event) => {
  const container = event.target.closest('[data-chart-container]');
  if (container && container.dataset.minimizeLaptopOnly === 'true') {
    const laptopMediaQuery = window.matchMedia('(min-width: 1200px)');

    if (laptopMediaQuery.matches) {
      container.classList.toggle('chart-minimized');

      const label = container.querySelector('div > div');
      if (label) {
        label.textContent = container.classList.contains('chart-minimized')
          ? 'Click to expand'
          : 'Click to minimize';
      }
    }
  }
});

let isLaptop = window.matchMedia('(min-width: 1200px)').matches;

window.addEventListener('resize', () => {
  const newIsLaptop = window.matchMedia('(min-width: 1200px)').matches;

  if (newIsLaptop !== isLaptop) {
    isLaptop = newIsLaptop;

    if (!isLaptop) {
      const minimizedCharts = document.querySelectorAll('.chart-minimized[data-minimize-laptop-only="true"]');
      minimizedCharts.forEach(chart => {
        chart.classList.remove('chart-minimized');
        const label = chart.querySelector('div > div');
        if (label) {
          label.textContent = 'Click to minimize';
        }
      });
    }
  }
});


if (!document.getElementById('charts-template-styles')) {
  const style = document.createElement('style');
  style.id = 'charts-template-styles';
  style.textContent = `
  .chart-minimized {
    height: 100px;
    min-height: 100px;
   
  }
  .chart-minimized canvas {
    opacity: 0.3;
    transform: scaleX(0.9);
  }
  
  /* Сховати label на mobile */
  @media (max-width: 1023px) {
    .chart-container div > div {
      display: none;
    }
  }
  `;
  document.head.appendChild(style);
}


export default ChartsTemplate;




// const ChartsTemplate = {
//   render(chartId) {
//     return `
//       <div class="h-full w-full relative min-h-[290px] mobile:min-h-[400px] laptop:min-h-0 font-archiv">
//         <canvas id="${chartId}" class="absolute inset-0 gradient-secondary rounded-2xl p-[16px]"></canvas>
//       </div>
//     `;
//   },
// }
//
//
// export default ChartsTemplate;