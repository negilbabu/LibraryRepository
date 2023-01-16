import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {


  constructor(private router:Router) { }

  ngOnInit(): void {
    this.dash();
  }

  profile() {
    throw new Error('Method not implemented.');
    }
    logout() {
      if (confirm('Are you sure want to Logout?')) {
        localStorage. clear()   
        this.router.navigate(['/login'])
      } else {
        
        this.router.navigate(['/sidenav'])
      } 
    }
    dash() {
    throw new Error('Method not implemented.');
    }

}
