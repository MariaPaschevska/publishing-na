import {Component} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {AuthenticationComponent} from './shared/authentication/authentication.component'
import {AuthErrorMessageComponent} from "./shared/authentication/auth-error-message/auth-error-message.component";
import {UiDispatcherService} from "./services/ui-dispatcher.service";

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
    private uiDispatcher: UiDispatcherService
  ) {
    uiDispatcher.authModalSubject.subscribe(
      () => {
        this.modalRef = this.modalService.show(AuthenticationComponent);
      });
    uiDispatcher.loginErrorSubject.subscribe(
      () => {
        this.modalRef = this.modalService.show(AuthErrorMessageComponent);
      });
  }

  ngOnInit(){
  }
}
