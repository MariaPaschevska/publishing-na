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

  getUser(login, password) {
    this.authService.getUser(login, password).subscribe(
      user => this.user = user,
      error => console.log('Subscription getUsers() error', error),
      () => console.log('Subscription getUsers() completed', this.user)
    );
  }

  authEnter(): void {
    const login = this.authForm.value.login;
    const password = this.authForm.value.password;
    console.log('So what is the user there?', login, password);
    this.getUser(login, password);
  }
}
