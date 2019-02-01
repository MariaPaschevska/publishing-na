import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "./user";
import {AuthenticationService} from "../services/authentication.service";

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

  users: User[];
  user: User;

  constructor(
    public modalRef: BsModalRef,
    private authService = AuthenticationService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers().subscribe(
      users => this.users = users,
      error => console.log('Subscription getUsers() error', error),
      () => console.log('Subscription getUsers() completed', this.users)
    );
  }

  authEnter(): void {
    const login = this.authForm.value.login;
    const pass = this.authForm.value.password;
    this.user.login = login;
    this.user.password = pass;
    console.log('So what is the user there?', this.user);
  }
}
