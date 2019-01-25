import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass']
})
export class BookEditComponent implements OnInit {

  id: number;
  book: object;

  bookEditForm = new FormGroup({
    author: new FormControl(''),
    year: new FormControl(''),
    isbn: new FormControl(''),
    language: new FormControl(''),
    translatedFrom: new FormControl(''),
    description: new FormControl('')
  });

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params
      .subscribe(
        params => {
          this.id = +params['id'];
        }
      );
  }

  ngOnInit(): void {
    this.getBook();
  }

  getBook(): void {
    this.booksService.getBook(this.id)
      .subscribe(
        book => {
          this.book = book;
        },
        error => {
          console.log('Error getBook BookDetail', error);
        },
        () => {
          console.log('Complete getBook BookDetail');
        }
      );
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log('Submitted Book', this.bookEditForm.value);
  }

}
