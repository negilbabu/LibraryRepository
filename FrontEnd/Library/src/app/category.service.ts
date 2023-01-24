import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiurl='http://localhost:8080';
  accesstocken:any
  tocken:any;
  constructor(private http:HttpClient,private router:Router) { }

  handleError(err: HttpErrorResponse): any {
    console.log('hhhii');
    if ( err.status === 403) {
      alert("UNAUTHORIZED ACCESS DETECTED")
      sessionStorage.clear()
      localStorage.clear()
      this.router.navigateByUrl(`/login`);    }    
  }




  addCategory(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/category',data).pipe((catchError(err => this.handleError(err))));
  }
  
  
  LoadCategory(){
    return this.http.get('http://localhost:8080/category/admin').pipe((catchError(err => this.handleError(err))));
  }

  CatPageAdmin(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get("http://localhost:8080/category/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }

  LoadCategoryForUser(){
    return this.http.get('http://localhost:8080/category/user').pipe((catchError(err => this.handleError(err))));
  }
  
  
  delete(categoryId:any):Observable<any>{
    return this.http.delete(this.apiurl+'/category/'+categoryId);
  }
  
  
  update(id: any, data: any) {
    return this.http.put(this.apiurl + "/category/" + id, data).pipe((catchError(err => this.handleError(err))));
  }
  
  editCategory(categoryId:any): Observable<any>{
    return this.http.get(this.apiurl + '/category/'+ categoryId).pipe((catchError(err => this.handleError(err))));
  }
  
  }
  