import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  baseUrl=environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) 
  { }


  sendotp(data:any):Observable<any>{
    console.log("email=",data);
    return this.http.post(this.baseUrl+'/email/emailsentotp',data)
  }

  verify(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/email/verify',data)
  }


  verifyPassword(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/email/verifyPassword',data)
  }
}
