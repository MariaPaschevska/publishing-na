import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()

export class Interceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ){}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor request', request);

    const token: string = this.authenticationService.getToken();
    console.log('Interceptor token', token);

    // if (token) {
    //
    // }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getToken()}`
      }
    });

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    return next.handle(request);
  }
}
