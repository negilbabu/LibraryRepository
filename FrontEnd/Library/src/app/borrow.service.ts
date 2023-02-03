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
 

  export(): Observable<Blob> {
    return this.http.get(this.baseUrl+'/borrow/admin/export', { responseType: 'blob' });
  }

  exportOnFilter(date1:any,date2:any): Observable<Blob> {
    return this.http.get(this.baseUrl+'/borrow/admin/export?date1='+date1+'&date2='+date2, { responseType: 'blob' });
  }

  chartbar():Observable<any>{
    return this.http.get(this.baseUrl+'/borrow/admin/chart')
  }

  sendMail(userId: any):Observable<any> {
    console.log("inservice"+userId)
    return this.http.post(this.baseUrl+'/email/emailsent/'+userId,userId)

  }

  add(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/borrow',data)

  }
  

  borrowHistoryPagination(page:any,tableSize:any,sort:any){
    return this.http.get(this.baseUrl+"/borrow/userBorrow/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort)

  }

  borrowPagination(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/borrow/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction)

  }


  finePagination(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/borrow/admin/fine/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction)

  }

  filterBorrowPagination(date1:any,date2:any,page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/borrow/admin/"+date1+"/"+date2+"/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction)

  }
    // user filer
    filterBorrowPagination2(date1:any,date2:any,page:any,tableSize:any,sort:any){
      return this.http.get(this.baseUrl+"/borrow/user/loadByIssueDate/"+date1+"/"+date2)
    }


    statusfilterBor(page:any,tableSize:any,sort:any,direction:any,status:any):Observable<any>{
      return this.http.get(this.baseUrl+"/borrow/user/statusFilter/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction+"&status="+status)
      
    }  

    AdminStatusfilterBorrow(page:any,tableSize:any,sort:any,direction:any,status:any):Observable<any>{
      return this.http.get(this.baseUrl+"/borrow/admin/statusFilter/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction+"&status="+status)
      
    } 

  LoadByIssueDate(date1:any,date2:any){
    return this.http.get(this.baseUrl+ "/borrow/loadByIssueDate/"+date1+"/"+date2);
  }
  //user
  LoadByIssueDateUser(date1:any,date2:any){
    return this.http.get(this.baseUrl+"/borrow/user/loadByIssueDateUser/"+date1+"/"+date2);
  }  

  Load(){
    return this.http.get(this.baseUrl+'/borrow')

  }

  LoadBorrowDetailView(borrowId: any){
    return this.http.get(this.baseUrl+'/borrow/'+ borrowId)

  }

  borrowBlock(){
    return this.http.get(this.baseUrl+'/borrow/borrowBlock');
  }

  LoadDue(){
    return this.http.get(this.baseUrl+'/borrow/due')

  }
  LoadFine(){
    return this.http.get(this.baseUrl+'/borrow/admin/fine')
  
  }
  //user
  LoadDueByUser(){
    return this.http.get(this.baseUrl+'/borrow/user/dueByUser')

  }

  LoadUserList(){
    return this.http.get(this.baseUrl+'/borrow/list/user')

  }

  LoadNotification(){
    return this.http.get(this.baseUrl+'/borrow/user/notification')

    }
  
  LoadUserNotification(){
    return this.http.get(this.baseUrl+'/borrow/user/UserNotification')

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
    return this.http.put(this.baseUrl + "/borrow/admin/accept/" + localStorage.getItem('borrowId'), data)

  }


  updateReject(id: any, data:any) {
    return this.http.put(this.baseUrl + "/borrow/admin/reject/" + localStorage.getItem('borrowId'), data)

  }

  bookReturn(id: any) {
    return this.http.put(this.baseUrl + "/borrow/admin/return/" + id,{headers:Headers})

  }

  undo(id: any) {
    return this.http.put(this.baseUrl + "/borrow/admin/undo/" + id,{headers:Headers})

  }


  
  edit(booksId:any): Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.get(this.baseUrl + '/borrow/'+ booksId,{headers:head_obj})

  }
  
  }
  