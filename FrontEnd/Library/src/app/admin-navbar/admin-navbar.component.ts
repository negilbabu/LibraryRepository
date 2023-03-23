import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {


  constructor(private router:Router,
    private authService : SocialAuthService
    ) { }

  ngOnInit(): void {
    this.dash();
  }

  profile() {
    this.router.navigate(['/view-adminprofile'])
    }
    logout(){
      if (confirm('Are you sure want to Logout?')) {
        this.authService.signOut();
        localStorage.clear();
    
        this.router.navigate(['/login'])
      } else {
        
        this.router.navigate(['/sidenav'])
      } 
      } 
    dash() {

    }

}
