import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../content-item/item';
import {BackendService} from '../providers/backend.service';

@Injectable({
  providedIn: 'root'
})
export class PinboardService {
  itemList: Item[];

  constructor(
    private backendService: BackendService
  ) {

  }

  public getContentItems(): Observable<Item[]>{
    return this.backendService.getAllPosts();
  }

  getContentItem(id: string) {
    return this.backendService.getPostById(id);
  }
}
