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


  borrowList: any[];
  borrowId:any;
  borrowdata:any;
  booksdata:any;

    constructor(private router:Router ,private service:BorrowService,private booksService:BooksService) {
 
      this.borrowList=[];
     }

  
    ngOnInit(): void {  
      sessionStorage.clear()
    this.LoadBorrow() 

    }


      LoadBorrow(){
        this.service.LoadFine().subscribe((data: any)=>{
        this.borrowdata=data;
        console.log(data);});
        
  }
    
      home()
      {
        this.router.navigate(['/sidenav'])
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
  