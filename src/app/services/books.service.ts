import { Injectable } from '@angular/core';
import { Book } from '../books/book';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";


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
        catchError(console.log('getBooks error', []))
      );
  }

  /** get Books by id from the mocked server */
  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url)
      .pipe(
        tap(_ => console.log('fetched selected book')),
        catchError(console.log(`getBook id=${id} error`))
      );
  }
}
