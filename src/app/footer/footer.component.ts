import {Component, OnInit} from '@angular/core';
import {UiDispatcherService} from "../services/ui-dispatcher.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor(
    private uiDispatcher: UiDispatcherService
  ) { }

  ngOnInit() {
  }

  openAuthLoginFormModal() {
    this.uiDispatcher.authModalSubject.next();
  }
}
