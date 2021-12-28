import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {BackendService} from '../providers/backend.service';
import {Item} from '../content-item/item';
import {Router} from '@angular/router';
import {AuthService} from '../providers/auth.service';

@Component({
  selector: 'app-create-content-item',
  templateUrl: './create-content-item.component.html',
  styleUrls: ['./create-content-item.component.scss']
})
export class CreateContentItemComponent implements OnInit {
  title = new FormControl();
  text = new FormControl();
  imgLink = new FormControl();
  fileAsString: string;

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  fileUploaded(fileAsString: string) {
    this.fileAsString = fileAsString;
  }

  createNewPost(){
    const item = {} as Item;
    item.id = '';
    item.title = this.title.value;
    item.text = this.text.value;
    if (this.fileAsString === null){
      item.imgLink = this.imgLink.value;
    }else{
      item.imgLink = this.fileAsString;
    }
    this.backendService.addPost(item).then(() => {
      this.router.navigate(['']);
    }, error => {
      this.authService.logout();
      console.log(error);
    });
  }

}
