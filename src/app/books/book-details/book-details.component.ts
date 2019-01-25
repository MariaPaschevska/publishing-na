import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {BooksService} from "../../services/books.service";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.sass']
})
export class BookDetailsComponent implements OnInit {

  id: number;
  book: object;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
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

  openBookEditPage(id) {
    this.router.navigate(['books', id, 'edit']);
  }
}
