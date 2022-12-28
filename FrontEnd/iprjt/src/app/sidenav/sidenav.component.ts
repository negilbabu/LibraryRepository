import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  status: any = 0;

  constructor(private router:Router,private categoryservice:CategoryService) { }

  ngOnInit(): void {
  }
close()
{
  this.status=1
}
logout()
{
if (confirm('Are you sure want to Logout?')) {
  localStorage. clear()   
  this.router.navigate(['/login'])
} else {
  
  this.router.navigate(['/sidenav'])
} 
}
home()
{
  this.router.navigate(['/sidenav'])
}

profile()
{
  this.router.navigate(['/view-adminprofile'])
}

dash()
{
  this.router.navigate(['/sidenav'])
}
}