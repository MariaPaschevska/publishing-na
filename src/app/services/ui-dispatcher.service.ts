import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UiDispatcherService {

  public loginErrorSubject: Subject<any>;
  public authModalSubject: Subject<any>;

  constructor() {
    this.loginErrorSubject = new Subject();
    this.authModalSubject = new Subject();
  }
}
