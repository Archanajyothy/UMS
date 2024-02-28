import { TestBed } from '@angular/core/testing';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'; // Corrected import
import { of, Observable } from 'rxjs'; // Added imports for stubbing

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: HttpInterceptor; // Changed the type to HttpInterceptor

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });

    interceptor = TestBed.inject(AuthInterceptor); // Creating an instance of AuthInterceptor
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept the request', () => {
    const request = new HttpRequest('GET', 'https://example.com/api/data');
    const next: HttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
        expect(req.url).toEqual('https://example.com/api/data'); // Assert that the request URL is correct
        return of({} as HttpEvent<any>); // Return an observable of HttpEvent
      }
    };

    interceptor.intercept(request, next).subscribe(); // Call intercept method and subscribe to it
  });
});


// import { TestBed } from '@angular/core/testing';
// import { HttpInterceptorFn } from '@angular/common/http';

// import { AuthInterceptor } from './auth.interceptor';

// describe('AuthInterceptor', () => {
//   const interceptor: HttpInterceptorFn = (req, next) => 
//     TestBed.runInInjectionContext(() => AuthInterceptor(req, next));

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//   });

//   it('should be created', () => {
//     expect(interceptor).toBeTruthy();
//   });
// });
