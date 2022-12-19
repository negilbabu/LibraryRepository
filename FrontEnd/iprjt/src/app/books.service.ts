import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  apiurl='http://localhost:8080';
  accesstocken:any
  constructor(private http:HttpClient) { }


  add(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/books',data)
  }
  
  
  Load(){
    return this.http.get('http://localhost:8080/books');
  }
  
  LoadbyCategory(categoryId:any):Observable<any>{
    return this.http.get('http://localhost:8080/books/findByCategory/'+categoryId);
  }
  
  
  delete(booksId:any):Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.delete(this.apiurl+'/books/'+booksId,{headers:head_obj});
  }
  

  pagination1(page:any,tableSize:any,sort:any){
    return this.http.get("http://localhost:8080/books/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort)
  }

  
  update(id: any, data: any) {
    // console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'library ' + localStorage.getItem('accessToken')
      })
    }
    return this.http.put(this.apiurl + "/books/" + id, data, httpOptions)
  }
  
  edit(booksId:any): Observable<any>{
    let tocken=localStorage.getItem('accesstoken')
    let  head_obj=new HttpHeaders({"Authorization":"library " + tocken})
    return this.http.get(this.apiurl + '/books/'+ booksId,{headers:head_obj});
  }
  
  }
  