import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BorrowService } from '../borrow.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    
  borrowList: any[];
  borrowId:any;
  borrowdata:any;
  duedata:any;
  returnData: any;
  
    constructor(private router:Router ,private service:BorrowService,private toast : NgToastService) {
      this.borrowList=[];
     }
  
    ngOnInit(): void {
  
      this.Load();
      this.DueToday();
      this.DueExpired();
    }
  
    Load() {
      this.service.LoadNotification().subscribe((data: any)=>{
      this.borrowdata=data;

      if(data[0].borrowId!=null){
        this.toast.success({detail:'REMAINDER',summary:'Watchout the due date :)',duration:5000});     
      }
      else{
        this.toast.success({detail:'REMAINDER',summary:'Nothing here :)',duration:5000}); 
      }

      if(data[0].borrowId==null){
        this.toast.success({detail:'REMAINDER',summary:'Nothing here :)',duration:5000}); 
      }
    //   if(data=[])
    //   {alert("nothing here")
    //  // this.router.navigate(['/userbody'])
    //   }
    console.log("<1")
      console.log(data)
      }); 
   } 
      
      
    DueExpired() {
        this.service.LoadDueByUser().subscribe((data: any)=>{
        //   if(data=[]){alert("nothing here")
        //  // this.router.navigate(['/userbody'])
        //   }
          this.duedata=data;
          console.log(">1")
          console.log(data);             
          });
       }
  
    DueToday(){
      // this.service.LoadUserNotification().subscribe((data: any)=>{
      //   this.returnData=data;
      //   console.log("=1")
      //   console.log(data);  
      // });

    }

      home()
      {
        this.router.navigate(['/userbody'])
      }
  
  }
  