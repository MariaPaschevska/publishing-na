import { Component, OnInit } from '@angular/core';
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
    buyButton: new FormControl('', Validators.required),
    imageUrl: new FormControl(''),
    imageBrowse: new FormControl(''),
    description: new FormControl('', Validators.required)
  });

  formData = null;

  constructor() { }

  ngOnInit() {
  }

  save(): void {
    this.formData = this.bookForm.value;
    console.log('formData value', this.formData);
  }

  // this.outputName.emit(formData)

}
