import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSort,Sort} from '@angular/material/sort';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';
import { CategoryService } from '../category.service';
import { saveAs } from 'file-saver';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css']
})
export class BorrowComponent implements OnInit {
  val: any;
  key: any;
  curDate= new Date()
  myDate:any;
  filename: any;

  borrowId:any;
  borrowdata:any;
  booksdata:any;


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
  sort1:string="borrowId";
  sort:string="borrow_id";
  len: any;
  flag:number=0;
  result: any;
  direction=1;
  direction1=-1;
  //borrow_id:any;
    constructor(private router:Router ,
      private datePipe:DatePipe,
      private service:BorrowService,
      private toast : NgToastService,
      private booksService:BooksService) {
 
      // this.borrowList=[];
      this.date=new Date();
     }

  
    ngOnInit(): void {  

      this.date = new Date();
      console.log("today-",this.date) 

      sessionStorage.clear()
      this.LoadData();

    }

    LoadData(){
      this.service.borrowPagination(this.page,this.tableSize,this.sort1,this.direction).subscribe(result=>{
        this.result=result.content;
        this.count=result.totalElements
        console.log(this.result);   
        this.data=this.result;                     
          });
    }

    ObjSampleForm:FormGroup=new FormGroup(
      { 
        date1:new FormControl('',[Validators.required]), 
        date2:new FormControl('',[Validators.required]), 
     
      }
    )

    dwn() {
      // if(this.key==""){
    
      this.myDate=this.datePipe.transform(this.curDate,'yyyy-MM-dd');
      this.filename="DataExport_"+this.myDate;
      this.service.export().subscribe((blob:any)=>saveAs(blob,this.filename))
      // }
      // else{
      //   this.myDate=this.datePipe.transform(this.curDate,'yyyy-MM-dd');
      //   this.filename="DataExport_"+this.myDate;
      //   this.service.exportSearch(this.search.controls['inp'].value).subscribe((blob:any)=>saveAs(blob,this.filename))
      // }
    
    // throw new Error('Method not implemented.');
    }
    


    sortfn(a:any){
    
      this.sort1=a;      
      this.page=this.page;
      this.tableSize;

     

      if(this.direction==1){
        this.direction=-1;
        console.log("DIR -----1",this.direction)
        this.ngOnInit();       
      }

      else{
        this.direction=1;
        console.log("dir -1",this.direction)
      this.ngOnInit(); 
      }

         
    }

    sortfilter(a:any){
   
      this.sort=a;      
      this.page=this.page;
      this.tableSize;

        if(this.direction1==1){
          this.direction1=-1;
          console.log("DIR -----1",this.direction1)
          this.getFilter();     
        }
  
        else{
          this.direction1=1;
          console.log("dir -1",this.direction1)
          this.getFilter();
        } 
          }


    getFilter() {
console.log("d=",this.ObjSampleForm.controls['date1'].value)
      this.flag=1; 
      this.service.filterBorrowPagination(this.ObjSampleForm.controls['date1'].value,this.ObjSampleForm.controls['date2'].value,this.page,this.tableSize,this.sort,this.direction1).subscribe(response=>{
        this.result=response.content;
        this.count=response.totalElements
        console.log(this.result);   
        this.data=this.result;                     
          });  
      }



      clearFilter(){
        this.flag=0;
        window.location.reload();
      }
      

      onTableDataChange(event: any) {
        console.log(event)   
        if(this.flag==0){         
          console.log('flag=',this.flag)
          this.service.borrowPagination(this.page,this.tableSize,this.sort1,this.direction).subscribe(result=>{
            this.result=result.content;
            this.count=result.totalElements
            console.log(this.result);   
            this.data=this.result;                     
              });
         }   
        else if(this.flag==1){
          console.log('flag=',this.flag)
          this.service.filterBorrowPagination(this.ObjSampleForm.controls['date1'].value,this.ObjSampleForm.controls['date2'].value,this.page,this.tableSize,this.sort,this.direction1).subscribe(response=>{
            this.result=response.content;
            this.count=response.totalElements
            console.log(this.result);   
            this.data=this.result;     
                   
        });
      }
      }


    
      

      ///////////////////////////////////////////////- C R U D -////////////////////////////////////////////////////
      
      home()
      {
        this.router.navigate(['/sidenav'])
      }      
      LogOut(){
        sessionStorage.clear()
        localStorage.clear()
        this.router.navigate(['/login'])
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
        console.log(borrow)
     if(borrow.paymentStatus=="UNPAID"){
      alert("FINE IS NOT PAIDED")
     }
     else{
        this.service.bookReturn(borrow.borrowId).subscribe({
          next: (Response: any) => {
            console.log(Response);
            // alert(" Book Returned")
            this.toast.success({detail:'Book Returned',summary:'Book '+borrow.books.booksName+' Returned by '+borrow.user.firstName,duration:5000});
            setTimeout(() => {
        
              window.location.reload()       
          }, 2500); 
          },
          error: (Response: any) => {
            console.log(Response)
            alert("invalid Borrow details")
          }
        })
        this.router.navigate(['/borrow'])
      }
        }
        datas(){
          this.val=this.ObjSampleForm.controls['date1'].value;
        console.log("date=",this.val)
        }
        

        undo(borrow: any) {
          alert(" Are you want to undo last change?")
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


        DetailView(borrow: any) {             
            
        console.log("in borrow");
        console.log(borrow);
        console.log(borrow.borrowId);

        sessionStorage.setItem('borrowId',borrow.borrowId)
        this.router.navigate(['/borrow-detail-view'])

            }


    
  

  
  }






  function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
