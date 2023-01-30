import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';

@Component({
  selector: 'app-fine',
  templateUrl: './fine.component.html',
  styleUrls: ['./fine.component.css']
})
export class FineComponent implements OnInit {

  borrowId:any;
  borrowdata:any;
  booksdata:any;
  data:number=1;




page:number=1;
count: any;
tableSize: number = 10;
a:any;
b:any;
sort:string="borrow_id";
len: any;
result: any;
booksCount: any;
direction=-1;

    constructor(private router:Router ,private service:BorrowService,private booksService:BooksService) {
 
     }

  
    ngOnInit(): void {  

    this.LoadBorrow() 

    }


      LoadBorrow(){
        this.service.finePagination(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
          this.result=result.content;
          this.count=result.totalElements
          this.data=this.result; 
          this.borrowdata=this.result;                   
         

      //   if(result.length!==0){
      //     this.data=0;
          
      //   }
      //   else if(result.length==0){
      //   this.data=1;
      //  }

     
      });
       
        
  }

  sortfn(a:any){    
    this.sort=a;      
    this.page=this.page;
    this.tableSize;
  
    if(this.direction==1){
      this.direction=-1;
      this.ngOnInit();       
    }
  
    else{
      this.direction=1;
    this.ngOnInit(); 
    }
    
  }

  onTableDataChange(event:any) {
  

    this.service.finePagination(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
      this.result=result.content;
      this.count=result.totalElements
      this.data=this.result;   
      this.borrowdata=this.result;                     
        })       
  }
        

     
  }
  