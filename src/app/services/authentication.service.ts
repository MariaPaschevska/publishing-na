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
    private http: HttpClient,
  ) {}

  getUser(login, password, toSave): Observable<HttpResponse<User>> {
    const user = {
      name: login,
      password: password
    };
    return this.http.post<User>(this.authUrl, user, { observe: 'response' })
      .pipe(
        tap(response => {
          const keys = response.headers.keys();
          const headers = keys.map( key =>
            `${key}: ${response.headers.get(key)}`
          );
          console.log(`AuthenticationService getUser response headers, ${headers}`);
          this.authToken = response.headers.get('authorization');
          console.log(`AuthenticationService authToken, ${this.authToken}`);
          this.currentUser = response.body;

          if (toSave) {
            this.saveCurrentUser(this.currentUser, this.authToken);
          }
        }),
        catchError(error => this.handleError(error))
      );
  }

  checkAdmin() {
    let roles;
    let checkAdmin;

    if (this.currentUser) {
      roles = this.currentUser.roles;
      checkAdmin = role => role == 'admin';
      return roles.some(checkAdmin);

    } else if (sessionStorage.getItem('user')) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user'));
      roles = sessionUser.roles;
      checkAdmin = role => role == 'admin';
      return roles.some(checkAdmin);

    } else {
      return false;
    }
  }

  showLoginModal() {
    alert('Вам потрібно авторизуватись');
  }

  saveCurrentUser(currentUser, authToken) {
    currentUser.token = authToken;
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }

  clearCurrentUser() {
    sessionStorage.clear();
    console.log('Clearing USER');
  }

  showUserErrorMessage() {
    console.log('User NOT found');
    alert('Користувача не знайдено');
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
      if (error.status === 401) {
        this.showLoginModal();
      } else if (error.status === 404) {
        this.showUserErrorMessage();
      }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
