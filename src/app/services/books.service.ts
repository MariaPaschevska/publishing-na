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
  private booksUrl = 'http://82.192.179.130:2222/books';

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
  getBook(id: string): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url)
      .pipe(
        tap(_ => console.log(`getBook id=${id} completed`)),
        catchError(this.handleError)
      );
  }

  /** PUT: update the book on the server */
  updateBook(book: Book): Observable<Book> {
    console.log('This is a book to update: ', book);

    return this.http.put<Book>(this.booksUrl, book, httpOptions)
      .pipe(
        tap(_ => console.log(`updated book id=${book._id}`)),
        catchError(this.handleError)
      );
  }

  addImage (file: File) {
    console.log('This is an image to upload: ', file);
    const formData = new FormData();
    formData.append('image', file, file.name);
    this.http.post('url', formData, httpOptions)
      .subscribe(response => {
        console.log('addImage response', response);
      });
  }

  /** POST: add a new book to the server */
  addBook (book: Book): Observable<Book> {
    const url = `${this.booksUrl}/${'new'}`;
    return this.http.post<Book>(url, book, httpOptions)
      .pipe(
      tap((book: Book) => console.log(`Book added with id=${book._id}`)),
        catchError(this.handleError)
    );
  }

  /** DELETE: delete the book from the server */
  deleteBook (id: string): Observable<any> {
    const url = `${this.booksUrl}/${id}`;

    return this.http.delete(url, httpOptions)
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
