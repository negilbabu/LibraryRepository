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
     
            alert("UNAUTHORIZED ACCESS DETECTED :( ")
            return throwError(errorMsg);

        } 
        // else if(error.status===400) {
        //     console.log('Page not Found');
        //     errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        // }
        console.log(errorMsg);
        return throwError(error);
    })
)
}
   

}
