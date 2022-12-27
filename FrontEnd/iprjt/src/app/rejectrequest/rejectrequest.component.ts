import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';

@Component({
  selector: 'app-rejectrequest',
  templateUrl: './rejectrequest.component.html',
  styleUrls: ['./rejectrequest.component.css']
})
export class RejectrequestComponent implements OnInit {

  borrowList: any[];
  borrowId:any;

  constructor(private router:Router ,private booksService:BooksService,private borrowService:BorrowService) {  
  // this.booksList=[];
  this.borrowList=[];
 }
 ngOnInit(): void {

 
}
   
ObjSampleForm:FormGroup=new FormGroup(
  { 
    reason:new FormControl('',[Validators.required])
  
  }
)


onSubmit(){
    this.rejectRequest(this.borrowId)
}

rejectRequest(borrowId:any){
  console.log("hi")
  console.log(borrowId)
  let body={
    reason: this.ObjSampleForm.controls['reason'].value
  
    }
    console.log(body)


  this.borrowService.updateReject(borrowId, body).subscribe({
    next: (Response: any) => {
      console.log(Response);
      alert(" Book Rejected")
      window.location.reload()
    },
    error: (Response: any) => {
      console.log(Response)
      alert("invalid Borrow details")
    }
  })
  this.router.navigate(['/borrow'])

}



// update(borrowId:any){
//   console.log("vjydsvajys")
//   console.log(borrowId)
//   let body={
//     issueDate: this.ObjSampleForm.controls['issueDate'].value,
//     returnDate: this.ObjSampleForm.controls['returnDate'].value,
//     dueDate: this.ObjSampleForm.controls['dueDate'].value

//     }

//   console.log(body)
//   this.borrowService.update(borrowId, body).subscribe({
//     next: (Response: any) => {
//       console.log(Response);
//       alert(" Book approved")
//       window.location.reload()
//     },
//     error: (Response: any) => {
//       console.log(Response)
//       alert("invalid Borrow details")
//     }
//   })
//   this.router.navigate(['/borrow'])

//  }

 home()
 {
   this.router.navigate(['/sidenav'])
 }

 
}
