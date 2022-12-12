import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // apiurl = 'http://localhost:8080'
   accesstocken:any
  


  constructor(private http: HttpClient) {

  }
  add(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/users',data)
  }

  login(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/login',data)
  }
  getUser(){
    return this.http.get('http://localhost:8080/users/viewProfile')
  }
  GetToken(){
    return localStorage.getItem('token')||'';
   }

   Load(){
    return this.http.get('http://localhost:8080/users');
  }
  

}



