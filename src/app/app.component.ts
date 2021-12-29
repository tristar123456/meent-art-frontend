import {Component} from '@angular/core';
import {ContactDialogComponent} from './contact-dialog/contact-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string  = 'Meent.art';
  public contactDialogOpened = false;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  openContactDialog() {
    if (!this.contactDialogOpened) {
      const contactDialog = this.dialog.open(ContactDialogComponent, {
        width: '98%',
        height: 'auto'
      });
      this.contactDialogOpened = true;

      contactDialog.afterClosed().subscribe((submitConfirmed: boolean) => {
        if (submitConfirmed) {
          this.snackBar.open('Contact Request sent!', 'Nice!', {
            panelClass: 'snackbar-custom',
            duration: 1400,
            verticalPosition: 'bottom',
          });
          setTimeout(() => {
            this.contactDialogOpened = false;
          }, 1600);
        } else {
          this.contactDialogOpened = false;
        }
      });
    }
  }
}
