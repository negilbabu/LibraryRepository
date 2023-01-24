import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

    baseUrl=environment.apiUrl;
  
    constructor(private http: HttpClient,private router:Router) { }
    
    handleError(err: HttpErrorResponse): any {
      if ( err.status === 403) {
        alert("UNAUTHORIZED ACCESS DETECTED")
        sessionStorage.clear()
        localStorage.clear()
        this.router.navigateByUrl(`/login`);    }    
    }
    
    LoadBooks(): Observable<any>  
    {
      return this.http.get(this.baseUrl+'/books/admin')

    }
  
    imageUpload(image:any,booksId:any):Observable<any>{
  
      const formData: FormData = new FormData();
      formData.append('image',image );
        
      return this.http.post(this.baseUrl+'/books/save/image/'+booksId,formData)

  
    }
  }
  