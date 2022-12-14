import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-booksdisplay',
  templateUrl: './booksdisplay.component.html',
  styleUrls: ['./booksdisplay.component.css']
})
export class BooksdisplayComponent implements OnInit {


//booksdata:any;

categoryList: any[];
categoryId:any;


booksList: any[];
books: any;
booksId: any;

categorydata:any;
booksdata:any;
catdata: any;
  constructor(private router:Router ,private booksservice:BooksService,private service:CategoryService,private borrowservice:BorrowService) {
    this.booksList=[];
    this.categoryList=[];
   }

  ngOnInit(): void {


    this.Load();
  }

  Load() {
    this.booksservice.Load().subscribe((data: any)=>{
    this.booksdata=data;
    });  }  


    requestBook(booksId: any) {
      console.log(booksId)
      if(booksId.booksCopies==0){
        alert("Sorry, This book is out of stock")   
        this.router.navigate(['/booksdisplay'])
      }
      else{
      let data=booksId
        this.borrowservice.add(data).subscribe({    
        next:(res)=>{
        this.booksId=res.booksId;
        console.log(res);   
        alert("Book request successfull")   
        this.router.navigate(['/borrowhistory'])
        },
        error:(msg)=>{}
      })
      }
    }


    home()
    {
      this.router.navigate(['/userbody'])
    }

}
