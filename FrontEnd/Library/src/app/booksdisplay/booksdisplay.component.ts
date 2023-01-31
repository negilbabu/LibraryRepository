import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
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
// categoryList: any[];
categoryId:any;

// booksList: any[];
books: any;
booksId: any;

categorydata:any;
booksdata:any;
catdata: any;

//////////////
data: any;
page:number=1;
count: any;
tableSize: number = 3;
ProdData: any;
sortedData: any;
a:any;
b:any;
searchResult:any
searchData:any
sort:string="auther";
len: any;
result: any;
  booksCount: any;
  direction=-1;


  constructor(private router:Router ,
    private booksservice:BooksService,
    private service:CategoryService,
    private borrowservice:BorrowService,
    private toast:NgToastService
    ) {
    // this.booksList=[];
    // this.categoryList=[];
   }

  ngOnInit(): void {


this.LoadData();
// this.borrowBlock();



  }

  LoadData(){
    this.booksservice.paginationForUser(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
      this.result=result.content;
      this.count=result.totalElements
      console.log("loaded books=",this.result);   
      this.data=this.result;                     
        });
  }


//   borrowBlock(){
// this.borrowservice.borrowBlock().subscribe({    
//   next:(res)=>{
//   this.booksCount=res;
//   // console.log("blk"); 
//   console.log("block rslt=",res); 
//   }})
// }

borrowStockEmpty(){
  
}

sortfn(a:any){    
  this.sort=a;      
  this.page=this.page;
  this.tableSize;

  if(this.direction==1){
    this.direction=-1;
    console.log("from desc to :",this.direction)
    this.ngOnInit();       
  }

  else{
    this.direction=1;
    console.log("from asc to desc",this.direction)
  this.ngOnInit(); 
  }
  
}



onTableDataChange(event:any) {
  
  console.log("page no=",event)
    this.booksservice.paginationForUser(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
      this.result=result.content;
      this.count=result.totalElements
      console.log("loaded books=",this.result);   
      this.data=this.result;                     
        })       
  }



    requestBook(booksId: any) {
      console.log(booksId)
      if(booksId.booksCopies==0){
        alert("Sorry, This book is out of stock")   
        this.router.navigate(['/booksdisplay'])
      }
      else{
        // if(this.booksCount>=3){
        //   alert("you cannot request any book, please return the current in hand books, thank you")
        // }
        // else{
      let data=booksId
      
        this.borrowservice.add(data).subscribe({    
        next:(res)=>{
        this.booksId=res.booksId;
  
        this.toast.info({summary:'Booking Successfull',duration:5000});
        this.router.navigate(['/borrowhistory'])
        },
        error:(msg)=>{

        if(msg.status==409){
          this.toast.info({detail:'Booking Failed',summary: 'Selected book already rented to you',duration:5000});
        }
        else if(msg.status=400){
          this.toast.info({detail:'Booking Failed',summary: 'You have already requested this book ',duration:5000});
        }
        else if(msg.status=417){
          this.toast.info({detail:'Booking Failed',summary: 'You have 3 books in hand, please return current books ',duration:5000});
        }
 

        }
      })
      }}
    // }


    home()
    {
      this.router.navigate(['/userbody'])
    }

}
