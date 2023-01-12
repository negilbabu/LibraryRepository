import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl="http://localhost:8080";
  constructor(
    private http: HttpClient,
  ) 
  { }


  sendotp(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/email/emailsentotp',data)
  }

  verify(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/email/verify',data)
  }
}
