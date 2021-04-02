import {EventEmitter, Injectable, Output} from '@angular/core';
import {Item} from "../content-item/item";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HostConfigProvider} from "./host-config.provider";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  itemList: Item[];
  observItemList = new Observable<Item[]>((itemList) => {
    this.httpClient.get<Item[]>(this.hostConfigProvider.getApiUrl() + '/item/list').subscribe((received: Item[]) => {
      itemList.next(received);
    })
  });

  constructor(
    private httpClient: HttpClient,
    private hostConfigProvider: HostConfigProvider
  ) {
    this.getAllPosts();
  }

  async addPost(addItem: Item) {
    return await this.httpClient.post<boolean>(
      this.hostConfigProvider.getApiUrl() + '/item/add',
      {
        addItem
      }
      , {
        responseType: 'json'
      },
    ).toPromise();
  }

  async deletePost(deleteItem): Promise<boolean> {
    return await this.httpClient.post<boolean>(
      this.hostConfigProvider.getApiUrl() + '/item/delete',
      {
        deleteItem
      }
      , {
        responseType: 'json'
      },
    ).toPromise();
  }

  async editPost(id: string, editedItem: Item): Promise<boolean> {
    editedItem.id = id;
    return await this.httpClient.post<boolean>(
      this.hostConfigProvider.getApiUrl() + '/item/edit',
      {
        editedItem
      }
      , {
        responseType: 'json'
      },
    ).toPromise();
  }

  getAllPosts(): Observable<Item[]> {
    this.observItemList.subscribe((receivedItemList: Item[]) => {
      this.itemList = receivedItemList;
    });
    return this.observItemList;
  }

  getPostById(id: string): Observable<Item> {
    return new Observable<Item>((item) => {
      this.httpClient.get<Item>(this.hostConfigProvider.getApiUrl() + '/item/' + id).subscribe((received: Item) => {
        item.next(received);
      })
    });
  }
}
