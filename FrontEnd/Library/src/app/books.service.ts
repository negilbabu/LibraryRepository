import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
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

  search(key: any, pageno: any, pagesize: any, sortby: any): Observable<any> {
    console.log('+++++++++++', key)
    return this.http.get('http://localhost:8080/books/admin/searchBooks/?keyword=' + key + '&pageNo=' + pageno + '&pageSize=' + pagesize + '&sortBy=' + sortby)
  }



  uploadCsv(file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    return this.http.post('http://localhost:8080/csv/admin/upload', formData)

  }
//pie
  chart(): Observable<any> {
    return this.http.get('http://localhost:8080/books/admin/pie')
  }


  add(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/books',data).pipe((catchError(err => this.handleError(err))))
  }
  
  
  Load(){
    return this.http.get('http://localhost:8080/books/admin').pipe((catchError(err => this.handleError(err))))
  }
  
  LoadbyCategory(categoryId:any):Observable<any>{
    return this.http.get('http://localhost:8080/books/user/findByCategory/'+categoryId).pipe((catchError(err => this.handleError(err))));
  }
  
  
  delete(booksId:any):Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.delete(this.apiurl+'/books/'+booksId,{headers:head_obj}).pipe((catchError(err => this.handleError(err))));
  }
  

  pagination1(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get("http://localhost:8080/books/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }
  paginationForUser(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get("http://localhost:8080/books/user/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }

  
  update(id: any, data: any) {
    // console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'library ' + localStorage.getItem('accessToken')
      })
    }
    return this.http.put(this.apiurl + "/books/" + id, data, httpOptions).pipe((catchError(err => this.handleError(err))))
  }
  
  edit(booksId:any): Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.get(this.apiurl + '/books/'+ booksId,{headers:head_obj}).pipe((catchError(err => this.handleError(err))));
  }
  
  }
  