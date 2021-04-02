import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxImageCompressService} from "ngx-image-compress";

const ALLOWED_TYPE = 'image'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() text = "Select an Image";
  filename: string;

  @Output() onFileUploaded = new EventEmitter<string | ArrayBuffer>();
  @Output() onFileReading = new EventEmitter<boolean>()
  fileName = '';

  constructor(
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    const file:File = event.target.files[0];
    if (file.type.split("/")[0] === ALLOWED_TYPE) {
      this.fileName = file.name;
      this.getBase64(file);
    }
  }

  //TODO: DOES NOT WORK PROPERLY
  getBase64(file): boolean {
    let reader = new FileReader();
    let fileAsString:string|ArrayBuffer;
    this.onFileReading.emit(true);
    // reader.readAsArrayBuffer(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imageCompress.compressFile(reader.result.toString(), -1, 50, 50).then(
        result => {
          this.onFileUploaded.emit(result);
        });
      this.onFileReading.emit(false);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
      return false;
    };
    return true;
  }

  clearFileUpload() {
    this.fileName = '';
    this.text = 'Cleared!';
    this.onFileUploaded.emit('');

  }
}
