import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-findby-category',
  templateUrl: './findby-category.component.html',
  styleUrls: ['./findby-category.component.css']
})
export class FindbyCategoryComponent implements OnInit {

  categoryList: any[];
  categoryId: any;

  booksList: any[];
  books: any;
  booksId: any;
  selectedGroup: any;

  categorydata: any;
  booksdata: any;
  catdata: any;
  ObjSampleForm: FormGroup = new FormGroup(
    {
      categoryId: new FormControl('', [Validators.required])
    })

  constructor(private router: Router,
     private booksService: BooksService, 
     private service: CategoryService,
      private borrowservice: BorrowService,
      private toast:NgToastService
      ) {
    this.booksList = [];
    this.categoryList = [];
  }

  ngOnInit(): void {
    this.service.LoadCategoryForUser().subscribe((data: any) => {
      this.catdata = data;
      console.log(this.catdata)
    });
  }

  home() {
    this.router.navigate(['/userbody'])
  }
  disp() {
    console.log(this.selectedGroup);
    this.booksService.LoadbyCategory(this.selectedGroup).subscribe((data: any) => {
      if (data.length>0) {

        this.booksdata = data;
        console.log(data)
      } else{
        this.booksdata=null
      }

    });
  }
requestBook(booksId: any) {

    let data = booksId
    this.borrowservice.add(data).subscribe({
      next: (res) => {
        this.booksId = res.booksId;
        this.toast.info({detail:'Success',summary: 'Book request success',duration:5000});
        this.router.navigate(['/borrowhistory'])
      },
      error: (msg) => {
        if(msg.status==409){
          this.toast.warning({detail:'Booking Failed',summary: 'Selected book already rented to you',duration:5000});
        }
        else if(msg.status=400){
          this.toast.warning({detail:'Booking Failed',summary: 'You have 3 books in hand, please return current books ',duration:5000});
        }
       }
    })
  }
}