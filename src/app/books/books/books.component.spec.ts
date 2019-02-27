import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BooksComponent } from './books.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {BooksService} from "../../services/books.service";
import { book } from '../../shared/fake-data/books'

fdescribe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let getBooksSpy;
  let bookServiceFake;
  let serviceGetBookSpy;
  let bookAuthor;
  let bookTitle;

  const fakeActivatedRoute = {
    url: of({}),
    children: []
  } as ActivatedRoute;

  beforeEach(async(() => {
    bookServiceFake = jasmine.createSpyObj('BooksService', ['getBooks']);
    serviceGetBookSpy = bookServiceFake.getBooks.and.returnValue( of([book]) );

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
    bookAuthor = fixture.nativeElement.querySelector(
      '.page-content .bookstore-item-wrap .bookstore-item-author span');
    bookTitle = fixture.nativeElement.querySelector(
      '.page-content .bookstore-item-wrap .bookstore-item-title .title');
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
    expect(serviceGetBookSpy).toHaveBeenCalled();
  });

  it('should show book title and author after getBooks() (fakeAsync)', fakeAsync(() => {
    fixture.detectChanges();

    tick(100); // flush the observable to get the book
    fixture.detectChanges(); // update view

    console.log('bookAuthor', bookAuthor);
    console.log('bookTitle', bookTitle);

    expect(bookTitle.textContent).toBe(book.title, 'should show book title');
    expect(bookAuthor.textContent).toBe(book.author, 'should show book author');
    expect(serviceGetBookSpy.calls.any()).toBe(true, 'getBooks called');
  }));
});
