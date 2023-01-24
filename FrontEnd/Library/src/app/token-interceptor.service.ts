import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserserviceService } from './userservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject:Injector,private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
   let userService=this.inject.get(UserserviceService)
   let jwttoken = req.clone({
    setHeaders: {
      authorization: 'library ' +userService.GetToken()
    }
   });
   return next.handle(jwttoken).pipe(
    catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.status===403) {
            console.log('UNAUTHORIZED ACCESS------');
            localStorage.clear()
            this.router.navigateByUrl(`/login`); 
            // errorMsg = `Error: ${error.error.message}`;
            alert("UNAUTHORIZED ACCESS DETECTED :( ")

        } 
        else if(error.status===4000) {
            console.log('Page not Found');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(errorMsg);
    })
)
}
   
    // throw new Error('Method not implemented.');

  //   intercept(objRequest: HttpRequest<any>, objNext: HttpHandler): Observable<HttpEvent<any>> {
  //     // if access token in the local storage append to same in incomming request

  //     console.log(objRequest.url);
  //     if (this.objLogin.getAccessToken())
  //         objRequest = this.addToken(objRequest, this.objLogin.getAccessToken())
  //     return objNext.handle(objRequest).pipe(
  //         catchError((objError: any) => {
  //             if (objError instanceof HttpErrorResponse && (objError.status === 401 || objError.status === 403)) {
  //                 this.spinner.hide();
  //                 return this.handle401Error(objRequest, objNext)
  //             }

  //             else {
  //                 this.spinner.hide();
  //                 return throwError(objError)
  //             }

  //         })
  //     );
  // }



  // }
}
