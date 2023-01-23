import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // apiurl='http://localhost:8080';
  baseUrl=environment.apiUrl;



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
    return this.http.get(this.baseUrl+"/users/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }





  add(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/users',data)
  }

  login(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/login',data)
  }
  getUser(){
    return this.http.get(this.baseUrl+'/users/viewProfile')
  }
  getAdmin(){
    return this.http.get(this.baseUrl+'/users/admin/viewProfile/').pipe((catchError(err => this.handleError(err))));
  }
  GetToken(){
    return localStorage.getItem('token')||'';
   }

   Load(){
    return this.http.get(this.baseUrl+'/users');
  }
  LoadUserDetailView(user: any){
    return this.http.get(this.baseUrl+'/users/admin/'+ localStorage.getItem('userId')).pipe((catchError(err => this.handleError(err))));
  }

}



