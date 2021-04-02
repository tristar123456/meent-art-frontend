import {Injectable, Input} from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {HostConfigProvider} from "../providers/host-config.rovider";
import {Observable} from "rxjs";
import {Item} from "../content-item/item";
import {BackendService} from "../providers/backend.service";

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

  getContentItem(id :string) {
    return this.backendService.getPostById(id);
  }
}
