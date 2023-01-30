
import { BooksService } from './../books.service';
// import { Borrow } from '././borrow';
import { BorrowComponent } from '../borrow/borrow.component';
// import { BorrowComponent } from './borrow/borrow.component';
import { FineComponent } from './../fine/fine.component';
import { Component, HostListener, OnInit } from '@angular/core';
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
  borrowId: any;
  borrowdata: any;
  status: any;
  duedata: any;
  returnData: any;
  rzp1: any;
  borrow: BorrowComponent[] | undefined;
  tot: any;
  name = localStorage.getItem('name')
  email = localStorage.getItem('email')
  phone = localStorage.getItem('phone')
  displayedColumns: any;
  constructor(private router: Router, private service: BorrowService, private toast: NgToastService) {
    this.borrowList = [];
  }

  ngOnInit(): void {

    this.Load();
    this.DueToday();
    this.DueExpired();
  }

  Load() {
    this.service.LoadNotification().subscribe((data: any) => {
      this.borrowdata = data;

      if (data[0].borrowId != null) {
        this.toast.success({ detail: 'REMAINDER', summary: 'Watchout the due date :)', duration: 5000 });
      }
      else {
        this.toast.success({ detail: 'REMAINDER', summary: 'Nothing here :)', duration: 5000 });
      }

      if (data[0].borrowId == null) {
        this.toast.success({ detail: 'REMAINDER', summary: 'Nothing here :)', duration: 5000 });
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
    this.service.LoadDueByUser().subscribe((data: any) => {
      this.duedata = data;
      console.log(">1")
      console.log("due",data);
    });
  }

  DueToday() {
    // this.service.LoadUserNotification().subscribe((data: any)=>{
    //   this.returnData=data;
    //   console.log("=1")
    //   console.log(data);  
    // });

  }

  home() {
    this.router.navigate(['/userbody'])
  }
  // payment
  options = {
    "key": "rzp_test_7z2YIWtTzdWzRh", // Enter the Key ID generated from the Dashboard
    "amount": "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "",
    "description": "Test Transaction",
    "image": "../../assets/BooksImage/item_pics/aadu.jpeg",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": this.name,
      "email": this.email,
      "contact": this.phone,
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };
  pay(fine: number, bookname: string,BooksImage:string) {
    console.log(fine)
    this.tot = fine * 100;
    this.options.amount = this.tot;
    this.options.name = bookname;
    this.options.image=BooksImage;
    this.service.LoadDueByUser().subscribe((data: any) => {
      this.duedata = data;
      this.borrow = data;
      console.log(this.duedata.fine)
      console.log(">1")
      console.log(data);
    });
    this.rzp1 = new this.service.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
    this.rzp1.on('payment.failed', function (response: any) {
      console.log(response.console.error.code);
    }
    );
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    this.status == 1;


    console.log(this.duedata[0].borrowId)
    this.service.payment(this.duedata[0].borrowId).subscribe({
      next: (Response: any) => {
        console.log(Response);
        // alert("Payment Success")
        this.toast.info({summary:'payment Successfull',duration:5000});
        
      },
      error: (Response: any) => {
        console.log(Response)
        alert("invalid Payment details")
      }
    })



  }
}