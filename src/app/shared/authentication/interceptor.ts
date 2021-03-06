import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {catchError, retry, tap} from "rxjs/operators";

@Injectable()

export class Interceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken: string = this.authenticationService.getAuthToken();
    console.log('Interceptor token', authToken);

    request = request.clone({
      setHeaders: {
        Authorization: `${authToken}`
      }
    });

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 404) {
            this.authenticationService.handleAuthError(error);
          } else {
            return throwError(error);
          }
        })
      );
  }
}
