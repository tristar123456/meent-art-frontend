import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from "./item";
import { MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {BackendService} from "../providers/backend.service";
import {AuthService} from "../providers/auth.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})
export class ContentItemComponent implements OnInit {
  @Input() item: Item;
  @Output() newItems = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private backendService: BackendService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  openDeleteDialog(item: Item): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backendService.deletePost(item).catch(error=>{
          this.authService.logout();
        });
        this.backendService.getAllPosts();
        this.newItems.emit();
      }
    });
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }
}
