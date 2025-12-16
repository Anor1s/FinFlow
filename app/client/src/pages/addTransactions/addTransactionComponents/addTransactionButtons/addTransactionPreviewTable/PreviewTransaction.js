
const PreviewTransaction = {
  render() {

    return `
      <div class="h-fit w-full rounded-2xl gradient-secondary py-[16px]" data-preview-transaction>
        <div  
          class=" h-[80px] w-full border-y-2 border-surface-secondary flex flex-col px-[16px] 
                  items-center justify-center gap-xs mb-[-2px]"
        >     
          <div class="w-full flex flex-row justify-between">
            <div class="h-full flex flex-row gap-sm" data-category-section>
              <!-- Icon Category -->
            </div>
            
            <div class="flex flex-row items-center justify-center gap-2" data-amount-section>
               <!-- Type Currency Amount -->
            </div>
          </div>
              
          <div class="w-full flex flex-row justify-between" data-datetime-section>
               <!-- Place Data Time -->
          </div>
        </div>
      </div>
    `
  }
};

export default PreviewTransaction;