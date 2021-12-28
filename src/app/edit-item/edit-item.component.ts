import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {BackendService} from '../providers/backend.service';
import {Item} from '../content-item/item';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../providers/auth.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  id: string;
  title = new FormControl();
  text = new FormControl();
  fileAsString: string;
  item: Item = {} as Item;
  imgLink = new FormControl();

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.backendService.getPostById(this.id).subscribe((receivedItem) => {
      this.item = receivedItem;
      if (!!this.item.title){
        this.title.setValue(this.item.title);
      }
      if (!!this.item.text){
        this.text.setValue(this.item.text);
      }
    });
  }

  fileUploaded(fileAsString: string) {
    this.fileAsString = fileAsString;
  }

  editPost(){
    const item = {} as Item;
    item.id = '';
    item.title = this.title.value;
    item.text = this.text.value;
    if (this.fileAsString === null){
      item.imgLink = this.imgLink.value;
    }else{
      item.imgLink = this.fileAsString;
    }
    this.backendService.editPost(this.id, item).then(() => {
        this.router.navigate(['']);
      },
        error => {
      this.authService.logout();
    });
  }
}
