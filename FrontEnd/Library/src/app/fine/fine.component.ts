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
    constructor(private router:Router ,private service:BorrowService,private booksService:BooksService) {
 
     }

  
    ngOnInit(): void {  
      sessionStorage.clear()
    this.LoadBorrow() 

    }


      LoadBorrow(){
        this.service.LoadFine().subscribe((data: any)=>{
        this.borrowdata=data;

        if(data.length!==0){
          this.data=0;
          
        }
        else if(data.length==0){
        this.data=1;
       }

      });

       
        
  }
        

     
  }
  