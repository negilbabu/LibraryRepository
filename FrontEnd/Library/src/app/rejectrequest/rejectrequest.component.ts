import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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

  constructor(private router:Router ,private booksService:BooksService,private borrowService:BorrowService,private toast : NgToastService) {  
  this.borrowList=[];
 }
 ngOnInit(): void {

 
}
closePopup() {
this.ObjSampleForm.reset();
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

  if(this.ObjSampleForm.valid){

  let body={
    reason: this.ObjSampleForm.controls['reason'].value
  
    }

  this.borrowService.updateReject(borrowId, body).subscribe({
    next: (Response: any) => {
      this.toast.error({detail:' Book Rejected Success',duration:2000});
      window.location.reload()
    },
    error: (Response: any) => {
       alert("invalid Borrow details")
    }
  })
  this.router.navigate(['/borrow'])

}
else{
  this.toast.error({detail:' Failed',summary:'Invalid Data',duration:2000});
}
}

}