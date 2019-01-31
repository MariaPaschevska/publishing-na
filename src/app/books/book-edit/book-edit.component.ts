import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass']
})
export class BookEditComponent implements OnInit {

  id: string;
  book: object;

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

  onSavedData(formData) {
    this.booksService.updateBook(formData)
      .subscribe(() => this.goBack());
  }
}
