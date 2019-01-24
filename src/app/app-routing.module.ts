import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {BookEditComponent} from "./books/book-edit/book-edit.component";
import {BookDetailsComponent} from "./books/book-details/book-details.component";
import {ProjectsComponent} from "./projects/projects/projects.component";
import {BooksComponent} from "./books/books/books.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {ProjectDetailsComponent} from "./projects/project-details/project-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'books', component: BooksComponent,
    children: [
      { path: ':id', component: BookDetailsComponent },
      { path: ':id/edit', component: BookEditComponent }
    ]
  },
  { path: 'projects', component: ProjectsComponent,
    children: [
      { path: ':id', component: ProjectDetailsComponent }
    ]
  },
  { path: 'contacts', component: ContactsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
