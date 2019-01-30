import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass']
})
export class BookEditComponent implements OnInit {

  id: string;
  book: object;

  bookEditForm = new FormGroup({
    author: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    translatedFrom: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.params
      .subscribe(
        params => {
          this.id = params['id'];
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

  save(): void {
    console.log('Saved bookEditForm Book', this.bookEditForm.value);
    this.booksService.updateBook(this.bookEditForm.value)
      .subscribe(() => this.goBack());
  }
}
