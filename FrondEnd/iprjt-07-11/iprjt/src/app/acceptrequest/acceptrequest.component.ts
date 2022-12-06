import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-acceptrequest',
  templateUrl: './acceptrequest.component.html',
  styleUrls: ['./acceptrequest.component.css']
})
export class AcceptrequestComponent implements OnInit {

  borrowList: any[];
  borrowId:any;
  val: any;
date: any;

  constructor(private router:Router ,private booksService:BooksService,private borrowService:BorrowService) {  
  // this.booksList=[];
  this.borrowList=[];
 }
 ngOnInit(): void {

  let date = new Date;
 
}
   
ObjSampleForm:FormGroup=new FormGroup(
  { 
    // issueDate:new FormControl('',[Validators.required]), 
    returnDate:new FormControl('',[Validators.required]), 
    dueDate:new FormControl('',[Validators.required]) 

  }
)


onSubmit(){
    this.update(this.borrowId)
}


update(borrowId:any){
  console.log("vjydsvajys")
  console.log(borrowId)
  let body={
    // issueDate: this.ObjSampleForm.controls['issueDate'].value,
    returnDate: this.ObjSampleForm.controls['returnDate'].value,
    dueDate: this.ObjSampleForm.controls['dueDate'].value

    }

  console.log(body)
  this.borrowService.update(borrowId, body).subscribe({
    next: (Response: any) => {
      console.log(Response);
      alert(" Book approved")
      window.location.reload()
    },
    error: (Response: any) => {
      console.log(Response)
      alert("invalid Borrow details")
    }
  })
  this.router.navigate(['/borrow'])

 }

 home()
 {
   this.router.navigate(['/body'])
 }

 datas(){
  this.val=this.ObjSampleForm.controls['returnDate'].value;
  // alert("dsfsdf"+this.val)
  // console.log("dsfadv"+this.val)
}

 
}
