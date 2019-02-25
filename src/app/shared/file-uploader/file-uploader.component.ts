import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpEventType} from "@angular/common/http";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.sass']
})
export class FileUploaderComponent implements OnInit {

  fileUploadForm = new FormGroup({
    fileBrowse: new FormControl()
  });

  selectedFile: File = null;
  filePath;
  progress: number;

  private url = 'http://82.192.179.130:2222/upload';
  @Output() fileUploaded = new EventEmitter();

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(this.url, formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(event.loaded / event.total * 100);
        } else if (event.type === HttpEventType.Response) {
          this.filePath = `http://82.192.179.130:2222/${event.body.toString()}`;
          this.fileUploaded.emit(this.filePath);
        }
      },
        error => console.log('onUpload error', error),
        () => console.log('onUpload completed')
      );

  }

  ngOnInit(): void {
  }

}
