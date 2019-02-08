import { Injectable } from '@angular/core';
import {User} from "../authentication/user";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = 'http://82.192.179.130:2222/auth';
  currentUser: User;
  authToken: string;

  constructor(
    private http: HttpClient
  ) { }

  // getUser(login, password): Observable<User> {
  //   const url = `${this.authUrl}?name=${login}&password=${password}`;
  //   return this.http.get<User>(url)
  //     .pipe(
  //       tap(user => this.currentUser = user),
  //       catchError(this.handleError)
  //     );
  // }

  getUser(login, password): Observable<HttpResponse<User>> {
    const url = `${this.authUrl}?name=${login}&password=${password}`;
    return this.http.get<User>(url, { observe: 'response' })
      .pipe(
        tap(response => {
          const keys = response.headers.keys();
          const headers = keys.map( key =>
            `${key}: ${response.headers.get(key)}`
          );
          console.log(`AuthenticationService getUser response headers, ${headers}`);

          this.authToken = response.headers.get('authorization');
          this.currentUser = response.body;
        }),
        catchError(this.handleError)
      );
  }

  checkAdmin() {
    if (this.currentUser) {
      console.log('checkAdmin() currentUser', this.currentUser);
      const roles = this.currentUser.roles;
      let checkAdmin = role => role == 'admin';
      return roles.some(checkAdmin);
    } else {
      return false;
    }
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
