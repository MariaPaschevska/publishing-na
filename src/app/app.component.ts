import {Component} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AuthenticationService} from "./services/authentication.service";
import {AuthenticationComponent} from './shared/authentication/authentication.component'
import {AuthErrorMessageComponent} from "./shared/authentication/auth-error-message/auth-error-message.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'publishing-na';

  public modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private authService: AuthenticationService
  ) {
    authService.authModalSubject.subscribe(
      () => {
        this.modalRef = this.modalService.show(AuthenticationComponent);
      });
    authService.loginErrorSubject.subscribe(
      () => {
        this.modalRef = this.modalService.show(AuthErrorMessageComponent);
      });
  }

  ngOnInit(){
  }
}
