import { Component, OnInit } from '@angular/core';
import {AuthenticationComponent} from "../authentication/authentication.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openAdminFormModal() {
    this.bsModalRef = this.modalService.show(AuthenticationComponent);
  }

}
