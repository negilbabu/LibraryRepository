import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

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
      console.log(this.id)
  }
  
    private baseUrl="http://localhost:8080";
    //header: any;
  
    constructor(private http: HttpClient,private router:Router) { }
    
    handleError(err: HttpErrorResponse): any {
      console.log('hhhii');
      if ( err.status === 403) {
        alert("UNAUTHORIZED ACCESS DETECTED")
        sessionStorage.clear()
        localStorage.clear()
        this.router.navigateByUrl(`/login`);    }    
    }
  


  
    LoadBooks(): Observable<any>  
    {
      return this.http.get(this.baseUrl+'/books/admin').pipe((catchError(err => this.handleError(err))));
    }
  
    imageUpload(image:any,booksId:any):Observable<any>{
  
      console.log("library")
      const formData: FormData = new FormData();
      formData.append('image',image );
      
  
      return this.http.post(this.baseUrl+'/books/save/image/'+booksId,formData).pipe((catchError(err => this.handleError(err))));
  
    }
  }
  