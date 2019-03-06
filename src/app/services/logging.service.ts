import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logError(message: string, stackTrace: string) {
    // Send errors to server here
    console.log('LoggingService message: ' + message);
    console.log('LoggingService stackTrace: ' + stackTrace);
  }
}
