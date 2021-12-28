import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import {Observable} from 'rxjs';

const ALLOWED_TYPE = 'image';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() text = 'Select an Image';
  filename: string;

  // @Output() onFileUploaded = new EventEmitter<string | ArrayBuffer>();
  @Output() onFileUploaded = new EventEmitter<string>();
  @Output() onFileReading = new EventEmitter<boolean>();
  fileName = '';

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  private uploadProgress: Observable<number | undefined>;

  constructor(
    private imageCompress: NgxImageCompressService,
    private afStorage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.onFileReading.emit(true);
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    const file: File = event.target.files[0];
    this.task = this.ref.put(file);
    this.uploadProgress = this.task.percentageChanges();
    this.task.then((a) => {
      a.ref.getDownloadURL().then((link: string) => {
        this.onFileUploaded.emit(link);
        this.onFileReading.emit(false);
      });
    });

    // if (file.type.split("/")[0] === ALLOWED_TYPE) {
    //   this.fileName = file.name;
    //   this.getBase64(file);
    // }
  }

  // TODO: DOES NOT WORK PROPERLY
  getBase64(file): boolean {
    const reader = new FileReader();
    let fileAsString: string|ArrayBuffer;
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
