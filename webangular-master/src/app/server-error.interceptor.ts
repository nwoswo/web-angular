import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {

         // this.toastr.error("status : " +error.status + " name : "+error.name)
      //    this.router.navigateByUrl('/login');

          return throwError(error);

      })
    );
  }
}
