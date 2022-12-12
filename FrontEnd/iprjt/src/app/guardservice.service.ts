import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardserviceService {

  constructor() { }


  IsLoggedIn(){
    return!!localStorage.getItem('token')
  }
}
