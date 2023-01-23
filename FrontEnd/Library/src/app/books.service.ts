import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  apiurl='http://localhost:8080';
  baseUrl=environment.apiUrl;

  constructor(private http:HttpClient,private router:Router) { }


handleError(err: HttpErrorResponse): any {

  if ( err.status === 403) {
    alert("UNAUTHORIZED ACCESS DETECTED")
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl(`/login`);    }    
}
handleCsvError(err: HttpErrorResponse): any {

  if ( err.status === 417) {
    alert("CSV upload failed : Invalid csv file")
   
       }    
}



  search(key: any, pageno: any, pagesize: any, sortby: any,direction:any): Observable<any> {
    return this.http.get(this.baseUrl+'/books/admin/searchBooks/?keyword=' + key + '&pageNo=' + pageno + '&pageSize=' + pagesize + '&sortBy=' + sortby+"&direction="+direction)
  }



  uploadCsv(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    return this.http.post(this.baseUrl+'/csv/admin/upload', formData).pipe((catchError(err => this.handleCsvError(err))))

  }
//pie
  chart(): Observable<any> {
    return this.http.get(this.baseUrl+'/books/admin/pie')
  }


  add(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/books',data).pipe((catchError(err => this.handleError(err))))
  }
  
  
  Load(){
    return this.http.get(this.baseUrl+'/books/admin').pipe((catchError(err => this.handleError(err))))
  }
  
  LoadbyCategory(categoryId:any):Observable<any>{
    return this.http.get(this.baseUrl+'/books/user/findByCategory/'+categoryId).pipe((catchError(err => this.handleError(err))));
  }
  
  
  delete(booksId:any):Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.delete(this.baseUrl+'/books/'+booksId,{headers:head_obj}).pipe((catchError(err => this.handleError(err))));
  }
  

  pagination1(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/books/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }
  paginationForUser(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/books/user/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }

  
  update(id: any, data: any) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'library ' + localStorage.getItem('accessToken')
      })
    }
    return this.http.put(this.baseUrl + "/books/" + id, data, httpOptions).pipe((catchError(err => this.handleError(err))))
  }
  
  edit(booksId:any): Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.get(this.baseUrl + '/books/'+ booksId,{headers:head_obj}).pipe((catchError(err => this.handleError(err))));
  }
  
  }
  