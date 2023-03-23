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
  baseUrl=environment.apiUrl;



  constructor(private http: HttpClient,private router:Router) {

  }

  userPaginationAdmin(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/users/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction);
      }

  verifyUser(val:any):Observable<any>{

    
    return this.http.post(this.baseUrl+'/users',val)
  }
  addUser(data:any):Observable<any>{

  
    return this.http.post(this.baseUrl+'/users/register',data)
  }

  

  googleSignIn(body:any){
  
      return this.http.post(this.baseUrl+"/users/google",body)
    }


  // googleSignIn(idToken:any):Observable<any>{
    
  //   return this.http.post(this.baseUrl+"/users/google", idToken)
  // }

  


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


  LoadUserDetailView(id: any){
    return this.http.get(this.baseUrl+'/users/admin/'+ id)
  }

  sendotp(data:any):Observable<any>{
    console.log("email=",data);
    
    return this.http.post(this.baseUrl+'/users/verify/oldPassword',data)
  }

  verifyPassword(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/users/reset/Password',data)
  }
  currentUserProfileEdit(data:any):Observable<any>{
    return this.http.put(this.baseUrl+'/users',data)
  }

  editCurrentUser(): Observable<any>{
   
    return this.http.get(this.baseUrl + '/users/admin/viewProfile/')

  }

  ////////////////////////////////

  public getUserByNickname(nickname:string): Observable<any> {
    return this.http.get(this.baseUrl + '/users/getUser/'+nickname)
  }

  Load(){
    return this.http.get(this.baseUrl+'/users/chatList');
  }
  
  searchUser(key:any):Observable<any>{
    return this.http.get(this.baseUrl+"/users/admin/searchUsers?key="+key);

  }
}



