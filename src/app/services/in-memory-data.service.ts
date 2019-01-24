import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const books = [
      {
        id: 1,
        isbn: '978-966-97200-7-8',
        title: 'Плисти проти течії. Том 2',
        subtitle: 'Філософські роздуми',
        author: 'Хорхе Анхель Ліврага',
        year: 2018,
        language: 'українська',
        translatedFrom: 'іспанської',
        pageNumber: 361,
        description: 'Другий том філософських есеїв, статей та лекцій аргентинського філософа Хорхе Анхеля Лівраги буде цікавий тим, хто замислюється над питаннями про сенс життя, природу людини, моральні чесноти, проблему вибору, закони розвитку історії та людства. «Ідеали тіла та ідеали душі», «Іти поміж мертвих», «Внутрішнє дзеркало», «Хвороби сучасного світу», «Культура безкультурності», «Як здійснюються мрії» — ці та інші есеї автора розкривають погляд сучасного філософа на життя людини та її взаємини зі світом.',
        imgUrl: 'http://newacropolis.org.ua/uploads/production/ckeditor/picture/data/a33/f09/7b-/a33f097b-b856-4081-8cfb-c83aa6aa67e4/content.png',
        buyButton: 'here will be the link'
      }
    ];
    return { books };
  }
}
