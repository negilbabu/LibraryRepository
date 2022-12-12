import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-borrowhistory',
  templateUrl: './borrowhistory.component.html',
  styleUrls: ['./borrowhistory.component.css']
})
export class BorrowhistoryComponent implements OnInit {

  //booksdata:any;
  // userdata: any;
  // userList:any[];


    
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
      this.service.LoadUserList().subscribe((data: any)=>{
      this.borrowdata=data;
      });  }  
  
  
      home()
      {
        this.router.navigate(['/userbody'])
      }
  
  }
  