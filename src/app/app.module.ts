import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { BooksComponent } from './books/books/books.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { NavigationComponent } from './navigation/navigation.component';
import {CollapseModule} from "ngx-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactsComponent,
    BooksComponent,
    BookDetailsComponent,
    BookEditComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
