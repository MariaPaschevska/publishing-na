import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

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

  constructor(private http: HttpClient) {}

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log('Selected file is', this.selectedFile);
  }

  onUpload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(this.url, formData)
      .subscribe(response => {
        console.log('onUpload file response', response);
      });

  }

  ngOnInit(): void {
  }

}
