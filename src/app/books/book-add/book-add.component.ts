import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Location } from '@angular/common';
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.sass']
})
export class BookAddComponent implements OnInit {

  bookAddForm = new FormGroup({
    author: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    translatedFrom: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
    imageBrowse: new FormControl(''),
    description: new FormControl('', Validators.required)
  });

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

  save(): void {
    console.log('Added book from Form is', this.bookAddForm.value);
    this.booksService.addBook(this.bookAddForm.value)
      .subscribe(() => this.goBack());
  }

}
