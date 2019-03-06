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
import {CollapseModule, ModalModule, ProgressbarModule} from "ngx-bootstrap";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './footer/footer.component';
import { BookAddComponent } from './books/book-add/book-add.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { AuthenticationComponent } from './shared/authentication/authentication.component';
import {Interceptor} from "./shared/authentication/interceptor";
import { FileUploaderComponent } from './shared/file-uploader/file-uploader.component';

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
    NavigationComponent,
    FooterComponent,
    BookAddComponent,
    BookFormComponent,
    AuthenticationComponent,
    FileUploaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    }
  ],
  entryComponents: [
    AuthenticationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
