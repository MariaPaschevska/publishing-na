import { Injectable } from '@angular/core';
import {User} from "../shared/authentication/user";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {UiDispatcherService} from "./ui-dispatcher.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authUrl = 'http://82.192.179.130:2222/auth';
  currentUser: User;

  constructor(
    private http: HttpClient,
    private uiDispatcher: UiDispatcherService
  ) {
    this.isSessionUser();
  }

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
          this.currentUser = response.body;
          this.currentUser.token = response.headers.get('authorization');
          if (toSave) {
            this.saveCurrentUser(this.currentUser);
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
    } else {
      return false;
    }
  }

  saveCurrentUser(currentUser) {
    sessionStorage.setItem('user', JSON.stringify(currentUser));
  }

  clearCurrentUser() {
    sessionStorage.clear();
  }

  isSessionUser() {
    if (!sessionStorage.getItem('user')) {
      return;
    }
    this.currentUser = JSON.parse(sessionStorage.getItem('user'));
  }

  getAuthToken() {
    let authToken;
    if (this.currentUser) {
      authToken = this.currentUser.token;
    }
    return authToken;
  }

  handleAuthError(error) {
    if (error.status === 404) {
      console.log('404 Користувача не знайдено');
      this.uiDispatcher.loginErrorSubject.next();
    } else if  (error.status === 401) {
      console.log('401 Вам потрібно авторизуватись');
      this.uiDispatcher.authModalSubject.next();
      this.clearCurrentUser();
      this.checkAdmin();
    } else {
      return throwError(error);
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
  }
}
