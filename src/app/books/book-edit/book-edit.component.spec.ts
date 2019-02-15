import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditComponent } from './book-edit.component';
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {BookFormComponent} from "../book-form/book-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";

describe('BookEditComponent', () => {
  let component: BookEditComponent;
  let fixture: ComponentFixture<BookEditComponent>;

  const fakeActivatedRoute = {
    params: of({id: 'id'})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEditComponent, BookFormComponent ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientModule ],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
