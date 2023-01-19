import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
function _window() : any {
  // return the global native browser window object
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
 
  get nativeWindow() : any {
    return _window();
  }
  

  

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
  export(): Observable<Blob> {
    return this.http.get('http://localhost:8080/borrow/admin/export', { responseType: 'blob' });
  }

  chartbar():Observable<any>{
    return this.http.get('http://localhost:8080/borrow/admin/chart')
  }

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
    // user filer
    filterBorrowPagination2(date1:any,date2:any,page:any,tableSize:any,sort:any){
      console.log(date1)
      return this.http.get(this.apiurl + "/borrow/user/loadByIssueDate/"+date1+"/"+date2)
    }

    //////////////
    statusfilterBor(page:any,tableSize:any,sort:any,direction:any,status:any):Observable<any>{
      return this.http.get("http://localhost:8080/borrow/user/statusFilter/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction+"&status="+status)
      // return this.http.get(this.apiurl + "/borrow/user/statusFilter?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction+"&status="+status)
    }
  
  // return this.http.get(this.apiurl + `/users/fetching/${type}/${date1}/${date2}`, httpOptions)
  LoadByIssueDate(date1:any,date2:any){
    return this.http.get(this.apiurl + "/borrow/loadByIssueDate/"+date1+"/"+date2);
  }
  //user
  LoadByIssueDateUser(date1:any,date2:any){
    return this.http.get(this.apiurl + "/borrow/user/loadByIssueDateUser/"+date1+"/"+date2);
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
    return this.http.get('http://localhost:8080/borrow/admin/fine').pipe((catchError(err => this.handleError(err))));
  }
  //user
  LoadDueByUser(){
    return this.http.get('http://localhost:8080/borrow/user/dueByUser').pipe((catchError(err => this.handleError(err))));
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


  payment(id: any) {
    return this.http.put(this.apiurl + "/borrow/user/paymentStatus/" + id,{headers:Headers});
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
  