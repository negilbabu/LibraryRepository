import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-user-detailview',
  templateUrl: './user-detailview.component.html',
  styleUrls: ['./user-detailview.component.css']
})
export class UserDetailviewComponent implements OnInit {
  
  

    userdata: any;
    role: any;
    
      constructor(private router:Router ,private service:UserserviceService) {
       }
    
      ngOnInit(): void {    
        
        this.LoadUser(this.userdata);
      }
    

LoadUser(userdata:any){
  this.service.LoadUserDetailView(userdata).subscribe((data)=>{
    this.userdata=data;
    ;});
}


      Load() {
        this.service.getUser().subscribe((data: any)=>{
        this.userdata=data;
 
        });  }  
    
    
    }
    