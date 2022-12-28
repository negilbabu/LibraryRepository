import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {


  

  apiurl='http://localhost:8080';
  accesstocken:any
  constructor(private http:HttpClient,private router:Router) { }
 
  ////////////////////////////////////////////////

handleError(err: HttpErrorResponse): any {
  console.log('hhhii');
  if ( err.status === 403) {
    alert("UNAUTHORIZED ACCESS DETECTED")
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl(`/login`);    }    
}

  //////////////////////////////////////////////

  sendMail(userId: any):Observable<any> {
    console.log("inservice"+userId)
    return this.http.post('http://localhost:8080/email/emailsent/'+userId,userId).pipe((catchError(err => this.handleError(err))));
  }

  add(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/borrow',data).pipe((catchError(err => this.handleError(err))))
  }
  

  borrowHistoryPagination(page:any,tableSize:any,sort:any){
    return this.http.get("http://localhost:8080/borrow/userBorrow/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort).pipe((catchError(err => this.handleError(err))))
  }

  borrowPagination(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get("http://localhost:8080/borrow/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }

  filterBorrowPagination(date1:any,date2:any,page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    console.log(date1,' to ',date2)
    return this.http.get(this.apiurl + "/borrow/admin/"+date1+"/"+date2+"/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }
  // return this.http.get(this.apiurl + `/users/fetching/${type}/${date1}/${date2}`, httpOptions)
  LoadByIssueDate(date1:any,date2:any){
    return this.http.get(this.apiurl + "/borrow/loadByIssueDate/"+date1+"/"+date2).pipe((catchError(err => this.handleError(err))));
  }
  
  Load(){
    return this.http.get('http://localhost:8080/borrow').pipe((catchError(err => this.handleError(err))));
  }

  LoadBorrowDetailView(id: any){
    return this.http.get('http://localhost:8080/borrow/'+ sessionStorage.getItem('borrowId')).pipe((catchError(err => this.handleError(err))));
  }

  borrowBlock(){
    return this.http.get('http://localhost:8080/borrow/borrowBlock');
  }


  LoadDue(){
    return this.http.get('http://localhost:8080/borrow/due').pipe((catchError(err => this.handleError(err))));
  }
  LoadFine(){
    return this.http.get('http://localhost:8080/borrow/fine').pipe((catchError(err => this.handleError(err))));
  }
  LoadDueByUser(){
    return this.http.get('http://localhost:8080/borrow/dueByUser').pipe((catchError(err => this.handleError(err))));
  }



  LoadUserList(){
    return this.http.get('http://localhost:8080/borrow/list/user').pipe((catchError(err => this.handleError(err))));
  }

  LoadNotification(){
    return this.http.get('http://localhost:8080/borrow/user/notification').pipe((catchError(err => this.handleError(err))));
    }
  
  LoadUserNotification(){
    return this.http.get('http://localhost:8080/borrow/user/UserNotification').pipe((catchError(err => this.handleError(err))));
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
    return this.http.put(this.apiurl + "/borrow/admin/accept/" + sessionStorage.getItem('borrowId'), data).pipe((catchError(err => this.handleError(err))));
  }


  // updateReject(id: any, data:any) {
  //   return this.http.put(this.apiurl + "/borrow/reject/" + id,{headers:Headers});
  // }
  updateReject(id: any, data:any) {
    return this.http.put(this.apiurl + "/borrow/admin/reject/" + sessionStorage.getItem('borrowId'), data).pipe((catchError(err => this.handleError(err))));
  }

  bookReturn(id: any) {
    return this.http.put(this.apiurl + "/borrow/admin/return/" + id,{headers:Headers}).pipe((catchError(err => this.handleError(err))));
  }

  undo(id: any) {
    return this.http.put(this.apiurl + "/borrow/admin/undo/" + id,{headers:Headers}).pipe((catchError(err => this.handleError(err))));
  }


  
  edit(booksId:any): Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.get(this.apiurl + '/borrow/'+ booksId,{headers:head_obj}).pipe((catchError(err => this.handleError(err))));
  }
  
  }
  