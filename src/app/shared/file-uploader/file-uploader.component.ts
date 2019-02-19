import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpEventType, HttpHeaders} from "@angular/common/http";

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

  private url = 'http://82.192.179.130:2222/upload';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
      // 'Access-Control-Allow-Origin': 'http://localhost:4200',
      // 'Access-Control-Allow-Methods': 'GET, POST',
      // 'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
    })
  };

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log('Selected file is', this.selectedFile);
  }

  onUpload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(this.url, formData, {
      reportProgress: true,
      observe: 'events',
      headers: this.httpOptions.headers
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('onUpload file progress', Math.round(event.loaded / event.total * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log('onUpload file response', event);
        }
      });

  }

  ngOnInit(): void {
  }

}
