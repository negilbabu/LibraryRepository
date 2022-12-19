import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-borrowhistory',
  templateUrl: './borrowhistory.component.html',
  styleUrls: ['./borrowhistory.component.css']
})
export class BorrowhistoryComponent implements OnInit {

    
  // borrowList: any[];
  borrowId:any;
  borrowdata:any;

////////////////
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
sort:string="borrowId";
len: any;
    constructor(private router:Router ,
      private service:BorrowService) {
      // this.borrowList=[];
     }
  
    ngOnInit(): void {  
      // this.Load();
      this.service.LoadUserList().subscribe(result=>{
        this.len=result;  

       // console.log(result)
        this.count=this.len.length;
      //  console.log(this.count)
        //this.data=result;
        
      })
      //this.onTableDataChange(this.page);
     
      if(this.searchData==null || this.searchData==""){
        this.service.borrowHistoryPagination(this.page,this.tableSize,this.sort).subscribe((result=>{
          this.data=result; 
          console.log(this.data)         
        }));        
      }
      else{
  
        this.data=this.searchData
      }    
    }
  
    // Load() {
    //   this.service.LoadUserList().subscribe((data: any)=>{
    //   this.borrowdata=data;
    //   });  }  

    sortfn(a:any){
    
      this.sort=a;      
      this.page=this.page;
      this.tableSize=5;
      this.ngOnInit();        
  
    }

    // sortData(sort: Sort) {
    //   const data1 = this.data.slice();
    //   if (!sort.active || sort.direction === '') {
    //     this.sortedData = data1;
    //     return;
    //   }

    //   this.sortedData = this.data.sort((a: { userId: string | number; firstName: string | number; }, b: { userId: string | number; firstName: string | number; }) => {
    //     const isAsc = sort.direction === 'asc';
    //     switch (sort.active) {
    //       case 'userId':
    //         return compare(a.userId, b.userId, isAsc);
    //       case 'firstName':
    //         return compare(a.firstName, b.firstName, isAsc);
          
    //       default:
    //         return 0;
    //     }
    //   });



    // }


    onTableDataChange(event:any) {
  
    console.log(event)
      this.service.borrowHistoryPagination(event,this.tableSize,this.sort).subscribe((result=>{
        this.data=result;
        console.log('hey')
      }),
      );

    }
  
  
      home()
      {
        this.router.navigate(['/userbody'])
      }
  
  
}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }

  