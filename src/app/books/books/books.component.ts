import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../book";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  booksList: Book[];
  showAllBooks: boolean;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.url
      .subscribe(
        () => {
          this.showAllBooks = !this.route.children.length;
        }
      );
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe(
      booksList => this.booksList = booksList,
      error => console.log('Subscription getBooks() error', error),
      () => console.log('Subscription getBooks() completed', this.booksList)
    );
  }

  openBookDetailsPage(id) {
    this.router.navigate(['books', id]);
  }

  openBookEditPage(id) {
    this.router.navigate(['books', id, 'edit']);
  }

  deleteBook(id) {
    console.log('booksList BEFORE delete', this.booksList);
    this.booksList = this.booksList.filter(b => b !== id);
    this.booksService.deleteBook(id).subscribe(
      console.log('Subscription deleteBook book with id:', id)
    );
    console.log('booksList AFTER delete', this.booksList);
  }
}
