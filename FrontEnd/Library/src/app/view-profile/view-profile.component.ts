import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  //booksdata:any;
  userdata: any;
  userList:any[];
  role: any;
  
    constructor(private router:Router ,private service:UserserviceService) {
      this.userList=[];
     }
  
    ngOnInit(): void {
  
      
      this.Load();
    }
  
    Load() {
      this.service.getUser().subscribe((data: any)=>{
      this.userdata=data;
      console.log(this.userdata)
      sessionStorage.setItem('role',data[0].role)
      });  }  
  
  
      home()
      {
        
        this.role=sessionStorage.getItem('role.value')|| '';
        console.log(this.role)
        // if(role!=2){
        //   this.router.navigate(['/body'])
        // }
        // else{
          this.router.navigate(['/userbody'])

        // }
      
      }
  
  }
  