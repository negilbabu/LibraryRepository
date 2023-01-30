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
  let body={
    reason: this.ObjSampleForm.controls['reason'].value
  
    }

  this.borrowService.updateReject(borrowId, body).subscribe({
    next: (Response: any) => {
      alert(" Book Rejected")
      window.location.reload()
    },
    error: (Response: any) => {
       alert("invalid Borrow details")
    }
  })
  this.router.navigate(['/borrow'])

}

}