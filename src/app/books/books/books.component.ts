import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../book";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  booksList: Book[];
  showAllBooks: boolean;

  constructor(
    public booksService: BooksService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.url
      .subscribe(
        () => {
          this.showAllBooks = !this.route.children.length;
          this.getBooks();
        }
      );
  }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.booksService.getBooks().subscribe(
      booksList => this.booksList = booksList,
      error => console.log('GetBooks() error', error),
      () => console.log('GetBooks() completed', this.booksList)
    );
  }

  openBookDetailsPage(id) {
    this.router.navigate(['books', id]);
  }

  openBookEditPage(id) {
    this.router.navigate(['books', id, 'edit']);
  }

  deleteBook(id, book) {
    this.booksService.deleteBook(id).subscribe(
      () => this.booksList = this.booksList.filter(b => b !== book),
      error => console.log('deleteBook() error', error),
      () => console.log('deleteBook() completed', this.booksList)
    );
  }
}
