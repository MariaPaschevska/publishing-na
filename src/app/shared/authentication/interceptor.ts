import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

@Injectable()

export class Interceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken: string = this.authenticationService.authToken;
    console.log('Interceptor token', authToken);

    request = request.clone({
      setHeaders: {
        Authorization: `${authToken}`
      }
    });

    return next.handle(request);
  }
}
