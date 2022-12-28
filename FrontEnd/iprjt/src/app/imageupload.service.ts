import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {
  id:any;
  setId(id:any){
    this.id=id;
  }
    getId(){
      return this.id;
  }
  
    private baseUrl="http://localhost:8080";
    //header: any;
  
    constructor(private http: HttpClient) { }
  
    LoadBooks(): Observable<any>  
    {
      return this.http.get(this.baseUrl+'/books/admin')
    }
  
    imageUpload(image:any,booksId:any):Observable<any>{
  
      console.log("library")
      const formData: FormData = new FormData();
      formData.append('image',image );
      
  
      return this.http.post(this.baseUrl+'/books/save/image/'+booksId,formData);
  
    }
  }
  