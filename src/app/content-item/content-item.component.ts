import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from './item';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {BackendService} from '../providers/backend.service';
import {AuthService} from '../providers/auth.service';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component';
import {ResizeService} from '../size-detector/resize.service';

@Component({
  selector: 'app-content-item',
  templateUrl: './content-item.component.html',
  styleUrls: ['./content-item.component.scss']
})
export class ContentItemComponent implements OnInit {
  @Input() item: Item;
  @Output() newItems = new EventEmitter<void>();
  public size: number;
  loadingFinished = false;

  constructor(
    private dialog: MatDialog,
    private backendService: BackendService,
    private authService: AuthService,
    private resizeService: ResizeService
  ) {
  }

  ngOnInit(): void {
    this.size = this.resizeService.current;
    this.resizeService.onResize$.subscribe((size) => {
      this.size = size;
    });
    setTimeout( () => {
      this.loadingFinished = true;
    }, 500);
  }

  openDeleteDialog(item: Item): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.backendService.deletePost(item).catch(error => {
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

  openImageDialog(imgLink: string) {
    if (this.size > 0) {
      const imageDialogRef = this.dialog.open(ImageDialogComponent, {
        width: 'auto',
        panelClass: 'image-dialog',
        data: {imgLink}
      });
    }
  }
}
