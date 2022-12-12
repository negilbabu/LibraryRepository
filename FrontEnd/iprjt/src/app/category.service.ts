import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiurl='http://localhost:8080';
  accesstocken:any
  tocken:any;
  constructor(private http:HttpClient) { }


  addCategory(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/category',data)
  }
  
  
  LoadCategory(){
    return this.http.get('http://localhost:8080/category');
  }
  
  
  delete(categoryId:any):Observable<any>{
    return this.http.delete(this.apiurl+'/category/'+categoryId);
  }
  
  
  update(id: any, data: any) {
    return this.http.put(this.apiurl + "/category/" + id, data);
  }
  
  editCategory(categoryId:any): Observable<any>{
    return this.http.get(this.apiurl + '/category/'+ categoryId);
  }
  
  }
  