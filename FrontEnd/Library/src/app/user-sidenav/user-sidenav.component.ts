import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.css']
})
export class UserSidenavComponent implements OnInit {
  status:any =0
  
    constructor(private router:Router,private categoryservice:CategoryService) { }
  
    ngOnInit(): void {
    }
  close(){
    this.status=1
  }
  logout(){
    if (confirm('Are you sure want to Logout?')) {
      localStorage. clear()   
      this.router.navigate(['/login'])
    } else {
      
      this.router.navigate(['/sidenav'])
    } 
  }
  }