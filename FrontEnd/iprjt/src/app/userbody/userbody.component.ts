import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-userbody',
  templateUrl: './userbody.component.html',
  styleUrls: ['./userbody.component.css']
})
export class UserbodyComponent implements OnInit {
  data: any;
  var:any;
  borrowdata: any;

  
  constructor(private router:Router,private service:BorrowService,private toast : NgToastService ) { }

  ngOnInit(): void {
    this.Load()
    this.DueExpired()

  


  }

  onClickBooks()
  {
    this.router.navigate(['/booksdisplay'])
  }
  onClickBooksbyCategory()
  {
    this.router.navigate(['/findby-category'])
  }

  onClickHistory()
  {
    this.router.navigate(['/borrowhistory'])
  }

  onClickNotification() {
    this.router.navigate(['/notification'])
  }
    

  onClickProfile()
  {
    this.router.navigate(['/view-profile'])
  }



  logout()  {
    if (confirm('Are you sure you want to LogOuT?')) {
      localStorage. clear() 
      sessionStorage.clear()  
      this.router.navigate(['/login'])
    } else {
      
      this.router.navigate(['/userbody'])
    } 
    }

    Load() {
      this.service.LoadNotification().subscribe((data: any)=>{
        this.borrowdata=data;
        console.log(data)



      var isFirstView1 = localStorage.getItem('isFirstView1') || '';
      if (isFirstView1 !== 'Yes') {
                localStorage.setItem('isFirstView1', 'Yes'); }

      if(data[0].borrowId!=null){
        if (isFirstView1 !== 'Yes') {
        this.toast.success({detail:'REMAINDER',summary:'Book due date is tommorow, view notification for more...',duration:5000});
      }}
     




      

      }); 
     }  

  

      DueExpired() {
       this.service.LoadDueByUser().subscribe((data: any)=>{
         console.log(data); 
         


      var isFirstView = localStorage.getItem('isFirstView') || '';
      if (isFirstView !== 'Yes') {
                localStorage.setItem('isFirstView', 'Yes'); }

          if(data[0].borrowId!=null){
            if (isFirstView !== 'Yes') {
               this.toast.success({detail:'REMAINDER',summary:'Book due date expired, view notification for more...',duration:5000});
              }}
         });
      }
      



}
