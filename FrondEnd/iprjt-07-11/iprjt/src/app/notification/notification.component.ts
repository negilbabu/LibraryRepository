import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
    constructor(private router:Router ,private service:BorrowService) {
      this.borrowList=[];
     }
  
    ngOnInit(): void {
  
      this.Load();
    }
  
    Load() {
      this.service.LoadNotification().subscribe((data: any)=>{
      this.borrowdata=data;
      console.log(data)
      });  }  
  
  
      home()
      {
        this.router.navigate(['/userbody'])
      }
  
  }
  