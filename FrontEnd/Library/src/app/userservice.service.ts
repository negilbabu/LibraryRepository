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

 
   accesstocken:any
 

  baseUrl=environment.apiUrl;




  constructor(private http: HttpClient,private router:Router) {

  }

  userPaginationAdmin(page:any,tableSize:any,sort:any,direction:any):Observable<any>{

    return this.http.get(this.baseUrl+"/users/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction);
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
    return this.http.get(this.baseUrl+'/users/admin/viewProfile/');
  }
  GetToken(){
    return localStorage.getItem('token')||'';
   }

   Load(){
    return this.http.get(this.baseUrl+'/users');
  }
  LoadUserDetailView(id: any){
    return this.http.get(this.baseUrl+'/users/admin/'+ id)

}
}



