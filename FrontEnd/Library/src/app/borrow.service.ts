import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class BorrowService {
 
  get nativeWindow() : any {
    return _window();
  }

  
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient,private router:Router) { }
 


handleError(err: HttpErrorResponse): any {
  console.log('hhhii');
  if ( err.status === 403) {
    alert("UNAUTHORIZED ACCESS DETECTED")
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl(`/login`);    }    
}


  export(): Observable<Blob> {
    return this.http.get(this.baseUrl+'/borrow/admin/export', { responseType: 'blob' });
  }

  chartbar():Observable<any>{
    return this.http.get(this.baseUrl+'/borrow/admin/chart')
  }

  sendMail(userId: any):Observable<any> {
    console.log("inservice"+userId)
    return this.http.post(this.baseUrl+'/email/emailsent/'+userId,userId).pipe((catchError(err => this.handleError(err))));
  }

  add(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/borrow',data).pipe((catchError(err => this.handleError(err))))
  }
  

  borrowHistoryPagination(page:any,tableSize:any,sort:any){
    return this.http.get(this.baseUrl+"/borrow/userBorrow/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort).pipe((catchError(err => this.handleError(err))))
  }

  borrowPagination(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/borrow/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }

  filterBorrowPagination(date1:any,date2:any,page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    console.log(date1,' to ',date2)
    return this.http.get(this.baseUrl+"/borrow/admin/"+date1+"/"+date2+"/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }
    // user filer
    filterBorrowPagination2(date1:any,date2:any,page:any,tableSize:any,sort:any){
      console.log(date1)
      return this.http.get(this.baseUrl+"/borrow/user/loadByIssueDate/"+date1+"/"+date2)
    }

    //////////////
    statusfilterBor(page:any,tableSize:any,sort:any,direction:any,status:any):Observable<any>{
      return this.http.get(this.baseUrl+"/borrow/user/statusFilter/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction+"&status="+status)
      
    }  

  LoadByIssueDate(date1:any,date2:any){
    return this.http.get(this.baseUrl+ "/borrow/loadByIssueDate/"+date1+"/"+date2);
  }
  //user
  LoadByIssueDateUser(date1:any,date2:any){
    return this.http.get(this.baseUrl+"/borrow/user/loadByIssueDateUser/"+date1+"/"+date2);
  }  

  Load(){
    return this.http.get(this.baseUrl+'/borrow').pipe((catchError(err => this.handleError(err))));
  }

  LoadBorrowDetailView(id: any){
    return this.http.get(this.baseUrl+'/borrow/'+ localStorage.getItem('borrowId')).pipe((catchError(err => this.handleError(err))));
  }

  borrowBlock(){
    return this.http.get(this.baseUrl+'/borrow/borrowBlock');
  }

  LoadDue(){
    return this.http.get(this.baseUrl+'/borrow/due').pipe((catchError(err => this.handleError(err))));
  }
  LoadFine(){
    return this.http.get(this.baseUrl+'/borrow/admin/fine').pipe((catchError(err => this.handleError(err))));
  }
  //user
  LoadDueByUser(){
    return this.http.get(this.baseUrl+'/borrow/user/dueByUser').pipe((catchError(err => this.handleError(err))));
  }

  LoadUserList(){
    return this.http.get(this.baseUrl+'/borrow/list/user').pipe((catchError(err => this.handleError(err))));
  }

  LoadNotification(){
    return this.http.get(this.baseUrl+'/borrow/user/notification').pipe((catchError(err => this.handleError(err))));
    }
  
  LoadUserNotification(){
    return this.http.get(this.baseUrl+'/borrow/user/UserNotification').pipe((catchError(err => this.handleError(err))));
    }
    
  getBorrowID(borrowId:any){
    return this.http.get(this.baseUrl+'/borrow'+borrowId);
  }


  payment(id: any) {
    return this.http.put(this.baseUrl+ "/borrow/user/paymentStatus/" + id,{headers:Headers});
  }

 
  delete(booksId:any):Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.delete(this.baseUrl+'/borrow/'+booksId,{headers:head_obj});
  }
  


  update(id: any, data: any) {
    return this.http.put(this.baseUrl + "/borrow/admin/accept/" + localStorage.getItem('borrowId'), data).pipe((catchError(err => this.handleError(err))));
  }


  updateReject(id: any, data:any) {
    return this.http.put(this.baseUrl + "/borrow/admin/reject/" + localStorage.getItem('borrowId'), data).pipe((catchError(err => this.handleError(err))));
  }

  bookReturn(id: any) {
    return this.http.put(this.baseUrl + "/borrow/admin/return/" + id,{headers:Headers}).pipe((catchError(err => this.handleError(err))));
  }

  undo(id: any) {
    return this.http.put(this.baseUrl + "/borrow/admin/undo/" + id,{headers:Headers}).pipe((catchError(err => this.handleError(err))));
  }


  
  edit(booksId:any): Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.get(this.baseUrl + '/borrow/'+ booksId,{headers:head_obj}).pipe((catchError(err => this.handleError(err))));
  }
  
  }
  