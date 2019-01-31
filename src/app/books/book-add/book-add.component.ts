import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BooksService } from "../../services/books.service";

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.sass']
})
export class BookAddComponent implements OnInit {

  constructor(
    private booksService: BooksService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  onSavedData(formData) {
    this.booksService.addBook(formData)
      .subscribe(() => this.goBack());
  }
}
