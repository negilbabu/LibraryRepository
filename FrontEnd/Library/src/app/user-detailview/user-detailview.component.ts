import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detailview',
  templateUrl: './user-detailview.component.html',
  styleUrls: ['./user-detailview.component.css']
})
export class UserDetailviewComponent implements OnInit {
  
  

    userdata: any;
    id: any;
    
      constructor(private router:Router ,
        private service:UserserviceService,
        private route: ActivatedRoute
        ) {
       }
    
      ngOnInit(): void {    
        this.id = this.route.snapshot.params['id'];
        this.LoadUser(this.id);
      }
    

LoadUser(id:any){
  this.service.LoadUserDetailView(id).subscribe((data)=>{
    this.userdata=data;
    ;});
}


      Load() {
        this.service.getUser().subscribe((data: any)=>{
        this.userdata=data;
 
        });  }  
    
    
    }
    