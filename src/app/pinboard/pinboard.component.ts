import {Component, OnInit} from '@angular/core';
import {Item} from '../content-item/item';
import {PinboardService} from './pinboard.service';
import {FilterService} from '../providers/filter.service';
import {ResizeService} from '../size-detector/resize.service';
import {SCREEN_SIZE} from '../size-detector/screen-size.enum';

@Component({
  selector: 'app-pinboard',
  templateUrl: './pinboard.component.html',
  styleUrls: ['./pinboard.component.scss']
})
export class PinboardComponent implements OnInit {
  filter: string;
  itemList: Item[];
  colList: Item[][];

  numberOfColumns = 4;

  size: SCREEN_SIZE;

  loadingContent = true;
  loadingContentFinished = false;

  constructor(
    private pinboardService: PinboardService,
    private filterService: FilterService,
    private resizeSvc: ResizeService,
  ) {
    this.size = this.resizeSvc.current;
    if (this.size < 4) {
      this.numberOfColumns = this.size + 1;
    } else {
      this.numberOfColumns = 4;
    }
    this.fetchList();
  }

  ngOnInit(): void {
    this.resizeSvc.onResize$.subscribe(x => {
      this.size = x;
      if (x < 4) {
        this.numberOfColumns = x + 1;
        this.colList = this.getColumns(this.itemList);
      } else {
        this.numberOfColumns = 4;
        this.colList = this.getColumns(this.itemList);
      }
    });
  }

  public fetchList() {
    this.getItemListFromApi();
    this.filterService.filter.subscribe((filterValue) => {
      this.filter = filterValue;
    });
  }

  getItemListFromApi(): void {
    this.pinboardService.getContentItems().subscribe((receivedItemList: Item[]) => {
      this.itemList = receivedItemList;
      this.itemList = this.itemList.reverse();
      this.colList = this.getColumns(this.itemList);
      this.loadingContent = false;
    }, error => {
      console.log(error);
    });
  }

  getItemById(id: string): Item {
    let item = {} as Item;
    this.pinboardService.getContentItem(id).subscribe((receivedItem) => {
      item = receivedItem;
    }, error => {
      console.log(error);
    });
    return item;
  }


  rowCount(): number {
    let rowCount = 0;
    if (!!this.itemList) {
      this.itemList.forEach((item: Item) => {
        rowCount++;
      });
      rowCount = Math.round((rowCount / this.numberOfColumns) + 1);
    }
    return rowCount;
  }

  getRows(): Array<Item[]> {
    const itemsInRows = new Array<Item[]>();
    for (let rowNumber = 0; rowNumber < this.rowCount(); rowNumber++) {
      itemsInRows.push(this.getRow(rowNumber));
    }
    return itemsInRows;
  }

  getRow(rowNumber: number): Item[] {
    const row = [] as Item[];
    for (let colNumber = 0; colNumber < this.numberOfColumns; colNumber++) {
      if (!!this.itemList[(rowNumber * 4) + colNumber]) {
        row.push(this.itemList[(rowNumber * 4) + colNumber]);
      }
    }
    return row;
  }

  getColumns(itemList: Item[]): Array<Item[]> {
    const itemsInColumns = new Array<Item[]>();
    for (let colNumber = 0; colNumber < this.numberOfColumns; colNumber++) {
      itemsInColumns.push(this.getColumn(itemList, colNumber));
    }
    return itemsInColumns;
  }

  getColumn(itemList: Item[], colNumber: number): Item[] {
    const col = [] as Item[];
    for (let rowNumber = 0; rowNumber < this.rowCount(); rowNumber++) {
      if (!!itemList[(rowNumber * this.numberOfColumns) + colNumber]) {
        col.push(itemList[(rowNumber * this.numberOfColumns) + colNumber]);
      }
    }
    return col;
  }
}
