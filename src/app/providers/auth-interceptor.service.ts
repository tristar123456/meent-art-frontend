import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: string = this.authService.getToken() || '';
    const csrftoken = this.getCookie('csrftoken') || '';

    // set global application headers.
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
      }
    });
    // Set headers for requests that require CSRF.
    if (csrftoken != '') {
      request = request.clone({
        headers: request.headers.set(
          'X-CSRFTOKEN',
          csrftoken,
        )
      })
    }
    // Set headers for requests that require authorization.
    if (accessToken != '') {
      let authenticatedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + accessToken,
        )
      });

      // Request with authorization headers
      return next.handle(authenticatedRequest);
    } else {
      // Request without authorization header
      return next.handle(request);
    }
  }
}
