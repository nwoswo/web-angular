import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private dataService: DataService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('INTERCEPTOR');
    const token = this.dataService.getToken();
    //console.log("token="+token);
    //console.log(request);

   /* req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`,
        'withCredentials': 'false'
      },
    });*/


    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


    //console.log(request);




      return next.handle(request)

      /*.pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }

        return throwError( err );

      })
    );
*/
  }
}
