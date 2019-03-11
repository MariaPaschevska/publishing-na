import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-auth-error-message',
  templateUrl: './auth-error-message.component.html',
  styleUrls: ['./auth-error-message.component.sass']
})
export class AuthErrorMessageComponent implements OnInit {

  constructor(
    public modalRef: BsModalRef
  ) {}

  ngOnInit() {
  }

}
