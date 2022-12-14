import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {


  borrowList: any[];
  borrowId:any;
  borrowdata:any;
  booksdata:any;

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [3, 6, 9, 12];

    constructor(private router:Router ,private service:BorrowService,private booksService:BooksService) {
 
      this.borrowList=[];
     }

  
    ngOnInit(): void {  
      sessionStorage.clear()
    this.LoadBorrow() 

    }


      LoadBorrow(){
        // this.service.Load().subscribe((data: any)=>{
        // this.borrowdata=data;
        // console.log(data);});
        this.service.Load().subscribe(
          (response) => {
            this.POSTS = response;
            this.borrowdata=response;
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }

      onTableDataChange(event: any) {
        this.page = event;
        this.LoadBorrow();
      }
      // onTableSizeChange(event: any): void {
      //   this.tableSize = event.target.value;
      //   this.page = 1;
      //   this.LoadBorrow();
      // }









    
      home()
      {
        this.router.navigate(['/body'])
      }      

      
      
      acceptRequest(borrow:any)
      {
        console.log("in borrow");
        console.log(borrow);
        console.log(borrow.borrowId);

        sessionStorage.setItem('borrowId',borrow.borrowId)
        this.router.navigate(['/acceptrequest'])
      }


      rejectRequest(borrow:any){
        
        console.log("in borrow");
        console.log(borrow);
        console.log(borrow.borrowId);

        sessionStorage.setItem('borrowId',borrow.borrowId)
        this.router.navigate(['/rejectrequest'])

      }

      bookReturn(borrow: any) {
     
        this.service.bookReturn(borrow.borrowId).subscribe({
          next: (Response: any) => {
            console.log(Response);
            alert(" Book Returned")
            window.location.reload()
          },
          error: (Response: any) => {
            console.log(Response)
            alert("invalid Borrow details")
          }
        })
        this.router.navigate(['/borrow'])
        }


        undo(borrow: any) {
     
          this.service.undo(borrow.borrowId).subscribe({
            next: (Response: any) => {
              console.log(Response);
              alert(" Book Returned status revoked")
              window.location.reload()
            },
            error: (Response: any) => {
              console.log(Response)
              alert("invalid Borrow details")
            }
          })
          this.router.navigate(['/borrow'])
          }
  
  }
  