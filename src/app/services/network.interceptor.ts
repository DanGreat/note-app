import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(
      catchError(err => {
        console.log('Error Caught: ', err);
        this.handleRequestErrors(err.status, (err.error.message) ? err.error.message : null);
        return of(err)
      })
    );
  }

  handleRequestErrors(statusCode: number, errorMessage: string) {

    switch(statusCode) {
      case 0:
        alert(errorMessage || 'Network Error')
        break
      case 400:
        alert(errorMessage || 'Bad Request')
        break
      case 401:
        alert(errorMessage || 'You are unauthorized')
        break
      case 403:
          alert(errorMessage || 'You are forbidden to access this resourse')
          break
      case 404:
        alert(errorMessage || 'Resource Not Found')
        break
      case 500:
        alert(errorMessage || 'Internal Server Error')
    }
  }
}
