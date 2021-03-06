import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import {AppRoutingModule} from "../../app-routing.module";
import {AboutComponent} from "../../about/about.component";
import {BooksComponent} from "../../books/books/books.component";
import {BookAddComponent} from "../../books/book-add/book-add.component";
import {BookEditComponent} from "../../books/book-edit/book-edit.component";
import {BookDetailsComponent} from "../../books/book-details/book-details.component";
import {ProjectDetailsComponent} from "../project-details/project-details.component";
import {ContactsComponent} from "../../contacts/contacts.component";
import {BookFormComponent} from "../../books/book-form/book-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

xdescribe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent,
        ProjectDetailsComponent
      ],
      imports: [ AppRoutingModule, FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
