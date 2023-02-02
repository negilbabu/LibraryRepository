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




  addCategory(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/category',data);

  }
  
  
  LoadCategory(){
    return this.http.get(this.baseUrl+'/category/admin');

  }

  CatPageAdmin(key:any,page:any,tableSize:any,sort:any,direction:any):Observable<any>{
    return this.http.get(this.baseUrl+"/category/admin/pagenated/?keyword="+key+"&pageNo="+page+"&pageSize="+tableSize+"&sortBy="+sort+"&direction="+direction);

  }

  LoadCategoryForUser(){
    return this.http.get(this.baseUrl+'/category/user');

  }
  
  
  delete(categoryId:any):Observable<any>{
    return this.http.delete(this.baseUrl+'/category/'+categoryId);
  }
  
  
  update(id: any, data: any) {
    return this.http.put(this.baseUrl + "/category/" + id, data);
  }
  
  editCategory(categoryId:any): Observable<any>{
    return this.http.get(this.baseUrl + '/category/'+ categoryId);
  }
  
  }
  