import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

//booksdata:any;
userdata: any;
userList:any[];

  constructor(private router:Router ,private service:UserserviceService) {
    this.userList=[];
   }

  ngOnInit(): void {

    
    this.Load();
  }

  Load() {
    this.service.Load().subscribe((data: any)=>{
    this.userdata=data;
    });  }  


    home()
    {
      this.router.navigate(['/sidenav'])
    }

}
