import { Injectable } from '@angular/core';
import {User} from "../authentication/user";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = 'http://82.192.179.130:2222/auth';
  currentUser: User;

  constructor(
    private http: HttpClient
  ) { }

  getUser(login, password): Observable<User> {
    const url = `${this.authUrl}?name=${login}&password=${password}`;
    return this.http.get<User>(url)
      .pipe(
        tap(user => this.currentUser = user),
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
