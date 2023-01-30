import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private booksService: BooksService, private service: CategoryService, private borrowservice: BorrowService) {
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
    console.log(booksId)
    let data = booksId
    this.borrowservice.add(data).subscribe({
      next: (res) => {
        this.booksId = res.booksId;
        console.log(res);
        alert("Book request successfull")
        this.router.navigate(['/borrowhistory'])
      },
      error: (msg) => { }
    })
  }
}
