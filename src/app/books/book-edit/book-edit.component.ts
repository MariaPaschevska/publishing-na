import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Book} from "../book";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass']
})
export class BookEditComponent implements OnInit {

  id: string;
  book: object;
  booksList: Book[];

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params
      .subscribe(
        params => {
          this.id = params['id'];
        }
      );
  }

  ngOnInit(): void {
    this.getBook();
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe(
      booksList => this.booksList = booksList,
      error => console.log('GetBooks() error', error),
      () => console.log('GetBooks() completed', this.booksList)
    );
  }

  getBook(): void {
    this.booksService.getBook(this.id)
      .subscribe(
        book => {
          this.book = book;
        },
        error => {
          console.log('Error getBook BookDetail', error);
        },
        () => {
          console.log('Complete getBook BookDetail');
        }
      );
  }

  goBack(): void {
    this.location.back();
  }

  onSavedData(formData) {
    this.booksService.updateBook(this.id, formData)
      .subscribe(
        () => this.goBack(),
        error => {
          console.log('Error onSavedData BookDetail', error);
        },
        () => {
          console.log('Complete onSavedData BookDetail');
        }
      );
  }
}
