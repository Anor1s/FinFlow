import  Item  from './Item.js';
import  ItemsData  from './ItemsData.js'


const List = {
   render() {
    return`
      <div class="h-full w-full ">
        <ul class="h-full  grid grid-cols-1 mobile:grid-cols-2 
        laptop:grid-cols-1 gap-[16px]">
          ${ItemsData.map(item => Item.render(item)).join('\n')}
        </ul>
      </div>  
      `
    }
}

export default List;
