import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav2',
  templateUrl: './sidenav2.component.html',
  styleUrls: ['./sidenav2.component.css']
})
export class Sidenav2Component implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
logout(){
  if (confirm('Are you sure want to Logout?')) {
    localStorage.clear();

    this.router.navigate(['/login'])
  } else {
    
    this.router.navigate(['/sidenav2'])
  } 
  } 
}