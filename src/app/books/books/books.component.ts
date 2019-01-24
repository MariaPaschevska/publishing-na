import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  booksList: Book[];

  constructor(
    private booksService: BooksService
  ) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe(
      booksList => this.booksList = booksList,
      error => console.log('Subscription getBooks() error', error),
      () => console.log('Subscription getBooks() completed')
    );
  }
}
