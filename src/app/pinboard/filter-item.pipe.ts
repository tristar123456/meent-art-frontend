import {Pipe, PipeTransform} from '@angular/core';
import {Item} from "../content-item/item";

@Pipe({
  name: 'filterItem'
})
export class FilterItemPipe implements PipeTransform {

  transform(itemList: Item[], filterValue: string): Item[] {
    if(!(filterValue === '')){
      filterValue = filterValue.toLowerCase();
      return itemList.filter((item) => (item.title.toLowerCase().includes(filterValue)) || (item.text.toLowerCase().includes(filterValue)));
    }
    return itemList;
  }

}
