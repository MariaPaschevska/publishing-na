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
    password: new FormControl('', Validators.required)
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
    this.getUser(login, password);
    this.modalRef.hide();
  }

  // getUser(login, password) {
  //   this.authService.getUser(login, password).subscribe(
  //     user => this.user = user,
  //     error => console.log('AuthenticationComponent subscription getUser() error', error),
  //     () => console.log('AuthenticationComponent subscription getUser() completed', this.user)
  //   );
  //}

  getUser(login, password) {
    this.authService.getUser(login, password).subscribe(
      response => this.user = response.body,
      error => console.log('AuthenticationComponent subscription getUser() error', error),
      () => console.log('AuthenticationComponent subscription getUser() completed', this.user)
    );
  }
}
