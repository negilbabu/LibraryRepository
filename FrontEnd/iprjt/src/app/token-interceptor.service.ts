import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserserviceService } from './userservice.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject:Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
   let userService=this.inject.get(UserserviceService)
   let jwttoken = req.clone({
    setHeaders: {
      authorization: 'library ' +userService.GetToken()
    }
   });
   return next.handle(jwttoken);
   
   
   
    // throw new Error('Method not implemented.');
  }
}
