import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contact} from './contact';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.scss']
})
export class ContactDialogComponent implements OnInit {
  public FormData: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private builder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.FormData = this.builder.group({
      email: new FormControl('', [Validators.compose([Validators.required, Validators.email])]),
      fullname: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  onSubmit(value: any) {
    try {
      const contactFormData = value as Contact;
      //  ADD FIREBASE INCLUSION FOR STORING CONTACT INFO
      this.dialogRef.close(true);
    } catch (e) {
      console.log(value, e);
    }
  }
}
