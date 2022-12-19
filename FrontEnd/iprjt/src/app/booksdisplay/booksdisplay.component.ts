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
sort:string="booksId";
len: any;
result: any;


  constructor(private router:Router ,private booksservice:BooksService,private service:CategoryService,private borrowservice:BorrowService) {
    // this.booksList=[];
    // this.categoryList=[];
   }

  ngOnInit(): void {
//    this.Load();
this.booksservice.Load().subscribe(result=>{
  this.len=result;  
  this.count=this.len.length;
  console.log(result)
})

if(this.searchData==null || this.searchData==""){
  this.booksservice.pagination1(this.page,this.tableSize,this.sort).subscribe((result=>{
    this.data=result; 
    console.log("thisata") 
    console.log(this.data)  
    console.log(result)       
  }));        
}
else{

  this.data=this.searchData
}

}

sortfn(a:any){
    
  this.sort=a;      
  this.page=this.page;
  this.tableSize;
  this.ngOnInit();        

}



onTableDataChange(event:any) {
  
  console.log(event)
    this.booksservice.pagination1(event,this.tableSize,this.sort).subscribe((result=>{
      this.data=result;
    }),
    );        
  }
  // Load() {
  //   this.booksservice.Load().subscribe((data: any)=>{
  //   this.len=data;
  //   });  }  


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
