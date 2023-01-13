import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GuardserviceService } from './guardservice.service';

@Injectable({
  providedIn: 'root'
})
export class HomeguardGuard implements CanActivate {

  constructor(private auth: GuardserviceService , private router: Router)
  {}

  canActivate( route:ActivatedRouteSnapshot , state:RouterStateSnapshot): boolean {  

  if(this.auth.IsLoggedIn()){
    return true;
  }
  else {
    this.router.navigate(['/login']);
    return false;
  }

  
}
}
