import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  status: any = 0;

  constructor(private router:Router) { }

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
