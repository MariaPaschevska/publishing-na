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
}
