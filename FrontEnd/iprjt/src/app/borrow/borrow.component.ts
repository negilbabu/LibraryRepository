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
  flag:number=0;
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
     // this.getFilter();
    }
    getFilter() {
      
      console.log(this.ObjSampleForm)
        // this.page=1  
        this.flag=1; 
        this.service.LoadByIssueDate(this.ObjSampleForm.controls['date1'].value,this.ObjSampleForm.controls['date2'].value).subscribe(result=>{
          this.len=result; 
          console.log(result)
          this.count=this.len.length;
        })
    
        if(this.searchData==null || this.searchData==""){

        this.sort="borrow_id";
         this.service.filterBorrowPagination(this.ObjSampleForm.controls['date1'].value,this.ObjSampleForm.controls['date2'].value,this.page,this.tableSize,this.sort).subscribe({
          next: (res: any) => {
          //console.log("--------")
            console.log(res);             
            this.data=res;       
          },         
        });
        
      }
      else{

        this.data=this.searchData
      } 
      }

      clearFilter(){
        this.flag=0;
        window.location.reload();
      }
      

      onTableDataChange(event: any) {
        console.log(event)   
        if(this.flag==0){         
          console.log('flag=',this.flag)
        this.service.borrowPagination(event,this.tableSize,this.sort).subscribe((result=>{
          this.data=result;
          console.log('sorted')
        }),
        );  
         }   
        else if(this.flag==1){
          console.log('flag=',this.flag)
        this.service.filterBorrowPagination(this.ObjSampleForm.controls['date1'].value,this.ObjSampleForm.controls['date2'].value,this.page,this.tableSize,this.sort).subscribe({
          next: (res: any) => {
            console.log("--------")
            console.log(res);             
            this.data=res;       
          },         
        });
      }
      }


      ///////////////////////////////////////////////- C R U D -////////////////////////////////////////////////////
      
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
  