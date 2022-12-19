import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {


  

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
  

  borrowHistoryPagination(page:any,tableSize:any,sort:any){
    return this.http.get("http://localhost:8080/borrow/userBorrow/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort)
  }

  borrowPagination(page:any,tableSize:any,sort:any){
    return this.http.get("http://localhost:8080/borrow/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort)
  }

  filterBorrowPagination(date1:any,date2:any,page:any,tableSize:any,sort:any){
    console.log(date1)
    return this.http.get(this.apiurl + "/borrow/"+date1+"/"+date2+"/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort)
  }
  // return this.http.get(this.apiurl + `/users/fetching/${type}/${date1}/${date2}`, httpOptions)
  LoadByIssueDate(date1:any,date2:any){
    return this.http.get(this.apiurl + "/borrow/loadByIssueDate/"+date1+"/"+date2);
  }
  
  Load(){
    return this.http.get('http://localhost:8080/borrow');
  }
  LoadDue(){
    return this.http.get('http://localhost:8080/borrow/due');
  }
  LoadFine(){
    return this.http.get('http://localhost:8080/borrow/fine');
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
  