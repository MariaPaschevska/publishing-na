import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BooksService } from "../../services/books.service";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.sass']
})
export class BookAddComponent implements OnInit {

  selectedFile: File = null;

  constructor(
    private booksService: BooksService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log('Selected file is', this.selectedFile);
  }

  onUpload() {
    this.booksService.addImage(this.selectedFile);
  }

  goBack(): void {
    this.location.back();
  }

  onSavedData(formData) {
    this.booksService.addBook(formData)
      .subscribe(() => this.goBack());
  }
}
