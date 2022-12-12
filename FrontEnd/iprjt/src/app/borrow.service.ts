import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  // update(id: any, data: any) {
  //   return this.http.put(this.apiurl + "/borrow/" + sessionStorage.getItem('borrowId'), data);
  // }
  

  apiurl='http://localhost:8080';
  accesstocken:any
  constructor(private http:HttpClient) { }
 
  sendMail(userId: any):Observable<any> {
    console.log("inservice"+userId)
    return this.http.post('http://localhost:8080/email/emailsent/'+userId,userId);
  }

  add(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/borrow',data)
  }
  
  
  Load(){
    return this.http.get('http://localhost:8080/borrow');
  }
  LoadDue(){
    return this.http.get('http://localhost:8080/borrow/due');
  }
  LoadDueByUser(){
    return this.http.get('http://localhost:8080/borrow/dueByUser');
  }



  LoadUserList(){
    return this.http.get('http://localhost:8080/borrow/list/user');
  }

  LoadNotification(){
    return this.http.get('http://localhost:8080/borrow/user/notification');
    }
    LoadUserNotification(){
      return this.http.get('http://localhost:8080/borrow/user/UserNotification');
      }
  


  
  getBorrowID(borrowId:any){
    return this.http.get('http://localhost:8080/borrow'+borrowId);
  }
  
  delete(booksId:any):Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.delete(this.apiurl+'/borrow/'+booksId,{headers:head_obj});
  }
  
  
  // update(id: any, data: any) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'library ' + localStorage.getItem('accessToken')
  //     })
  //   }
  //   return this.http.put(this.apiurl + "/borrow/" + id, data, httpOptions)
  // }

  update(id: any, data: any) {
    return this.http.put(this.apiurl + "/borrow/" + sessionStorage.getItem('borrowId'), data);
  }


  // updateReject(id: any, data:any) {
  //   return this.http.put(this.apiurl + "/borrow/reject/" + id,{headers:Headers});
  // }
  updateReject(id: any, data:any) {
    return this.http.put(this.apiurl + "/borrow/reject/" + sessionStorage.getItem('borrowId'), data);
  }

  bookReturn(id: any) {
    return this.http.put(this.apiurl + "/borrow/return/" + id,{headers:Headers});
  }

  undo(id: any) {
    return this.http.put(this.apiurl + "/borrow/undo/" + id,{headers:Headers});
  }


  
  edit(booksId:any): Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.get(this.apiurl + '/borrow/'+ booksId,{headers:head_obj});
  }
  
  }
  