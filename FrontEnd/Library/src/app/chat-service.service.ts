import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http:HttpClient) { }



  baseUrl=environment.apiUrl;
  
  loadcuruser(){
    return this.http.get(this.baseUrl+'/login')
  }

  sendchat(data:any):Observable<any>{
    return this.http.post(this.baseUrl+'/msg',data)
  }

  LoadChat(data:any):Observable<any>{
    console.log(data);
    
    return this.http.get(this.baseUrl+'/msg/'+data)
  }
}
