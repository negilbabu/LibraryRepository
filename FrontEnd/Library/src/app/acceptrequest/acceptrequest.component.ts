import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';

@Component({
  selector: 'app-acceptrequest',
  templateUrl: './acceptrequest.component.html',
  styleUrls: ['./acceptrequest.component.css']
})
export class AcceptrequestComponent implements OnInit {

  borrowList: any[];
  borrowId: any;
  val: any;
  date: any;

  constructor(private router: Router,
    private toast: NgToastService,
    private booksService: BooksService,
    private borrowService: BorrowService) {

    this.borrowList = [];
  }
  ngOnInit(): void {

    this.date = new Date();


  }

  ObjSampleForm: FormGroup = new FormGroup(
    {

      returnDate: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required])

    }
  )


  submit() {
    this.update(this.borrowId)
  }


  update(borrowId: any) {
    if(this.ObjSampleForm.valid){
    
    let body = {

      returnDate: this.ObjSampleForm.controls['returnDate'].value,
      dueDate: this.ObjSampleForm.controls['dueDate'].value

    }
    this.borrowService.update(borrowId, body).subscribe({
      next: (Response: any) => {
        this.toast.success({ detail: 'Success', summary: ' Book Approved', duration: 5000 });
        this.router.navigate(['/borrow'])
      },
      error: (Response: any) => {
        if(Response.status==417){
        this.toast.info({ detail: 'Oops, Book stock is empty', summary: 'Unable to approve at this moment', duration: 15000 });
        alert("UNABLE TO APPROVE REQUEST ")
        this.router.navigate(['/borrow'])
      }
      }
    })


  }
  else{
    this.toast.warning({ detail: 'Error', summary: 'Fill up all fields', duration: 5000 });
  }
}

  datas() {
    this.val = this.ObjSampleForm.controls['returnDate'].value;

  }
  closePopup() {
    this.ObjSampleForm.reset();
      }


}
