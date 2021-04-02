import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterValue = new BehaviorSubject<string>('');

  constructor() { }

  applyFilter(filter: string) {
    this.filter.next(filter);
  }

  get filter() {
    return this.filterValue;
  }
}
