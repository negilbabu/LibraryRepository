import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-view-adminprofile',
  templateUrl: './view-adminprofile.component.html',
  styleUrls: ['./view-adminprofile.component.css']
})
export class ViewAdminprofileComponent implements OnInit {


  userdata: any;
  role: any;
  
    constructor(private router:Router ,private service:UserserviceService) {
     }
  
    ngOnInit(): void {
  
      
      this.Load();
    }
  
    Load() {
      this.service.getAdmin().subscribe((data: any)=>{
      this.userdata=data;
      });  }  
  
  
  }
  