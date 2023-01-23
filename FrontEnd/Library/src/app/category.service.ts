import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  baseUrl=environment.apiUrl;

  constructor(private http:HttpClient,private router:Router) { }


  handleError(err: HttpErrorResponse): any {
 
    if ( err.status === 403) {
      alert("UNAUTHORIZED ACCESS DETECTED")
      sessionStorage.clear()
      localStorage.clear()
      this.router.navigateByUrl(`/login`);    }    
  }




  addCategory(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/category',data).pipe((catchError(err => this.handleError(err))));
  }
  
  
  LoadCategory(){
    return this.http.get(this.baseUrl+'/category/admin').pipe((catchError(err => this.handleError(err))));
  }

  CatPageAdmin(page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/category/admin/pagenated/?pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction).pipe((catchError(err => this.handleError(err))))
  }

  LoadCategoryForUser(){
    return this.http.get(this.baseUrl+'/category/user').pipe((catchError(err => this.handleError(err))));
  }
  
  
  delete(categoryId:any):Observable<any>{
    return this.http.delete(this.baseUrl+'/category/'+categoryId);
  }
  
  
  update(id: any, data: any) {
    return this.http.put(this.baseUrl + "/category/" + id, data).pipe((catchError(err => this.handleError(err))));
  }
  
  editCategory(categoryId:any): Observable<any>{
    return this.http.get(this.baseUrl + '/category/'+ categoryId).pipe((catchError(err => this.handleError(err))));
  }
  
  }
  