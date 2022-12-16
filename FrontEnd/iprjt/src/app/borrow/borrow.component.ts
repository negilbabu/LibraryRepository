import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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


  // borrowList: any[];
  borrowId:any;
  borrowdata:any;
  booksdata:any;

  // POSTS: any;
  // page: number = 1;
  // count: number = 0;
  // tableSize: number = 5;
  // tableSizes: any = [3, 6, 9, 12];
  date:any;
  data: any;
  page:number=1;
  count: any;
  tableSize: number = 5;
  ProdData: any;
  sortedData: any;
  a:any;
  b:any;
  searchResult:any
  searchData:any
  sort:string="status";
  len: any;
  //borrow_id:any;
    constructor(private router:Router ,private service:BorrowService,private booksService:BooksService) {
 
      // this.borrowList=[];
      this.date=new Date();
     }

  
    ngOnInit(): void {  
      sessionStorage.clear()
    // this.LoadBorrow() 
    this.service.Load().subscribe(result=>{
      this.len=result; 
      console.log(result)
      this.count=this.len.length;
      console.log(this.count)
      //this.data=result;
      
    })
    
   
    if(this.searchData==null || this.searchData==""){
      this.service.borrowPagination(this.page,this.tableSize,this.sort).subscribe((result=>{
        this.data=result; 
        console.log('OnloadPagenation')  
        console.log(this.data)         
      }));        
    }
    else{

      this.data=this.searchData
    } 

    }

    ObjSampleForm:FormGroup=new FormGroup(
      { 
        date1:new FormControl('',[Validators.required]), 
        date2:new FormControl('',[Validators.required]), 
     
      }
    )

    sortfn(a:any){
    
      this.sort=a;      
      this.page=this.page;
      this.tableSize;
      this.ngOnInit();        
  
    }
    getFilter() {
      
      console.log(this.ObjSampleForm)
        // this.page=1
   
        this.sort="borrow_id";
         this.service.filterBorrowPagination(this.ObjSampleForm.controls['date1'].value,this.ObjSampleForm.controls['date2'].value,this.page,this.tableSize,this.sort).subscribe({
          next: (res: any) => {
            console.log("infilter")
            console.log(res);
            console.log("endfilter")
            this.len=res;      
            this.count=this.len.length;
            this.data=res;
       
          },
          error: (error: any) => {
            console.log(error);
          }
        })
      // }
      // this.service.Load().subscribe(result=>{
      //   this.len=result; 
      //   console.log(result)
      //   this.count=this.len.length;
      // //  console.log(this.count)
      //   //this.data=result;
        
      // })
      //this.onTableDataChange(this.page);
     
      // if(this.searchData==null || this.searchData==""){
      //   this.service.borrowPagination(this.page,this.tableSize,this.sort).subscribe((result=>{
      //     this.data=result; 
      //     console.log('OnloadPagenation')  
      //     console.log(this.data)         
      //   }));        
      // }
      // else{
  
      //   this.data=this.searchData
      // } 
  
      
      }
      


      // LoadBorrow(){
      //   // this.service.Load().subscribe((data: any)=>{
      //   // this.borrowdata=data;
      //   // console.log(data);});
      //   this.service.Load().subscribe(
      //     (response) => {
      //       //this.POSTS = response;
      //       this.borrowdata=response;
      //       console.log(response);
      //     },
      //     (error) => {
      //       console.log(error);
      //     }
      //   );
      // }

      onTableDataChange(event: any) {
        console.log(event)
        this.service.borrowPagination(event,this.tableSize,this.sort).subscribe((result=>{
          this.data=result;
          console.log('sorted')
        }),
        );  
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
  