import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // apiurl = 'http://localhost:8080'
   accesstocken:any
  


  constructor(private http: HttpClient,private router:Router) {

  }

  handleError(err: HttpErrorResponse): any {
    console.log('hhhii');
    if ( err.status === 403) {
      alert("UNAUTHORIZED ACCESS DETECTED")
      sessionStorage.clear()
      localStorage.clear()
      this.router.navigateByUrl(`/login`);    }    
  }

  ////////////////////////////////////////////////////////////////////


  userPaginationAdmin(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get("http://localhost:8080/users/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
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
  getAdmin(){
    return this.http.get('http://localhost:8080/users/admin/viewProfile/').pipe((catchError(err => this.handleError(err))));
  }
  GetToken(){
    return localStorage.getItem('token')||'';
   }

   Load(){
    return this.http.get('http://localhost:8080/users');
  }
  LoadUserDetailView(user: any){
    return this.http.get('http://localhost:8080/users/admin/'+ localStorage.getItem('userId')).pipe((catchError(err => this.handleError(err))));
  }

}



