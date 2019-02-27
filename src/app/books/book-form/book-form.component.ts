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

  @Input() book;
  @Output() bookFormSaved = new EventEmitter();

  fileUploaded;

  constructor() { }

  ngOnInit() {
    this.updateFormWithCurrentValues();
  }

  onFileUploaded(fileUploaded) {
    this.fileUploaded = fileUploaded;
  }

  save(): void {
    const formData = this.bookForm.value;
    if (this.fileUploaded) {
      formData.imageUrl = this.fileUploaded;
    }
    this.bookFormSaved.emit(formData);
  }

  updateFormWithCurrentValues() {
    if (this.book) {
      this.bookForm.patchValue({
        author: this.book.author,
        title: this.book.title,
        subtitle: this.book.subtitle,
        year: this.book.year,
        isbn: this.book.isbn,
        language: this.book.language,
        translatedFrom: this.book.translatedFrom,
        pageNumber: this.book.pageNumber,
        price: this.book.price,
        buyButton: this.book.buyButton,
        imageUrl: this.book.imageUrl,
        description: this.book.description
      });
    }
  }
}
