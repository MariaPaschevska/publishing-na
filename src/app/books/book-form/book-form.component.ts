import {Component, EventEmitter, OnInit,  Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent implements OnInit {

  bookForm = new FormGroup({
    author: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    subtitle: new FormControl(''),
    year: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    translatedFrom: new FormControl('', Validators.required),
    pageNumber: new FormControl(''),
    price: new FormControl(''),
    buyButton: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl('', Validators.required)
  });

  @Input() book: object;
  @Output() bookFormSaved = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save(): void {
    const formData = this.bookForm.value;
    console.log('formData value', formData);
    this.bookFormSaved.emit(formData);
  }
}
