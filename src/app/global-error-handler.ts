import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from './services/logging.service';
import { ErrorService } from './services/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    console.log('GlobalErrorHandler WORKS', error);

    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      message = errorService.getServerErrorMessage(error);
      console.log('GlobalErrorHandler Server Error', message);

    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      stackTrace = errorService.getClientStack(error);

      logger.logError(message, stackTrace);
    }
  }
}
