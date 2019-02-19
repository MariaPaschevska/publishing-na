import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {User} from "./user";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  authForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    checkInput: new FormControl()
  });

  user: User;

  constructor(
    public modalRef: BsModalRef,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  authEnter(): void {
    const login = this.authForm.value.login;
    const password = this.authForm.value.password;
    const toSave = this.authForm.value.checkInput;

    this.getUser(login, password, toSave);
    this.modalRef.hide();
  }

  getUser(login, password, toSave) {
    this.authService.getUser(login, password, toSave).subscribe(
      response => this.user = response.body,
      error => console.log('AuthenticationComponent subscription getUser() error', error),
      () => console.log('AuthenticationComponent subscription getUser() completed', this.user)
    );
  }
}
