import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksComponent } from './books.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable, of} from "rxjs";
import {BooksService} from "../../services/books.service";

fdescribe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let getBooksSpy;
  let bookServiceFake;
  let testBook = {
    id: 4,
    isbn: '978-966-97200-3-0',
    title: 'Плисти проти течії',
    subtitle: 'Філософські роздуми',
    author: 'Хорхе Анхель Ліврага',
    year: 2015,
    language: 'українська',
    translatedFrom: 'іспанської',
    pageNumber: 0,
    description: 'Збірка філософських есеїв',
    imgUrl: 'http://newacropolis.org.ua/uploads/production/ckeditor/picture/data/a54/7b1/d9-/a547b1d9-9a0e-427c-96fa-092e89ff9f37/content.png',
    price: 225,
    buyButton: true,
    buyLink: ''
  };

  const fakeActivatedRoute = {
    url: of({})
  } as ActivatedRoute;

  // const bookServiceFake = {
  //   getBooks: [testBook]
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksComponent ],
      imports: [ RouterModule, HttpClientModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: BooksService, useValue: bookServiceFake }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    getBooksSpy = spyOn(component, 'getBooks');
    bookServiceFake = TestBed.get(BooksService);
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBooks() OnInit', () => {
    fixture.detectChanges();
    expect(getBooksSpy).toHaveBeenCalled();
  });

  it('should call booksService.getBooks() on getBooks()', () => {
    component.getBooks();
    const booksServiceGetBookSpy = spyOn(component.booksService, 'getBooks');
    expect(booksServiceGetBookSpy).toHaveBeenCalled();
  });
});
