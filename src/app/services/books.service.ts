import { Injectable } from '@angular/core';
import { Book } from '../books/book';
import {Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = 'api/books';

  constructor(
    private http: HttpClient
  ) { }

  /** get Books from the mocked server */
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        tap(_ => console.log('fetched books')),
        catchError(this.handleError)
      );
  }

  /** get Books by id from the mocked server */
  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url)
      .pipe(
        tap(_ => console.log(`getBook id=${id} completed`)),
        catchError(this.handleError)
      );
  }

  /** PUT: update the book on the server */
  updateBook(book: Book): Observable<Book> {
    console.log('this is a book I want to update: ', book);

    return this.http.put<Book>(this.booksUrl, book, httpOptions)
      .pipe(
        tap(_ => console.log(`updated book id=${book.id}`)),
        catchError(this.handleError)
      );
  }

  /** DELETE: delete the book from the server */
  deleteBook(book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete<Book>(url, httpOptions)
      .pipe(
        tap(_ => console.log(`delete book id=${id}`)),
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
