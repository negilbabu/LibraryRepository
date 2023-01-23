import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  borrowId: any;
  borrowdata: any;

  ////////////////
  selected="status";
  result: any;
  direction=-1;
  status=1;
  date: any;
  data: any;
  page: number = 1;
  count: any;
  tableSize: number = 5;
  ProdData: any;
  sortedData: any;
  a: any;
  b: any;
  searchResult: any
  searchData: any
  sort: string = "status";
  len: any;
  flag: number = 0;
  selectedGroup: any;
  constructor(private router: Router,
    private service: BorrowService) {
    // this.borrowList=[];
  }

  disp1() {
    this.status=1;
    console.log('stat-------------------=',this.status)
    if(this.filter.controls['status'].value==1){
      console.log('/////------------=',this.status)
      this.service.statusfilterBor(this.page,this.tableSize,this.sort,this.direction,1).subscribe(response=>{
        this.result=response.content;
        this.count=response.totalElements
        console.log(this.result);   
        this.data=this.result;                     
          }); 
    }
    else if(this.filter.controls['status'].value==2){

      this.service.statusfilterBor(this.page,this.tableSize,this.sort,this.direction,2).subscribe(response=>{
        this.result=response.content;
        this.count=response.totalElements
        console.log(this.result);   
        this.data=this.result;                     
          }); 
    }

    else if(this.filter.controls['status'].value==3){

      this.service.statusfilterBor(this.page,this.tableSize,this.sort,this.direction,3).subscribe(response=>{
        this.result=response.content;
        this.count=response.totalElements
        console.log(this.result);   
        this.data=this.result;                     
          }); 
    }

    else if(this.filter.controls['status'].value==4){

      this.service.statusfilterBor(this.page,this.tableSize,this.sort,this.direction,4).subscribe(response=>{
        this.result=response.content;
        this.count=response.totalElements
        console.log(this.result);   
        this.data=this.result;                     
          }); 
    }
    else{
      
    }
 
  }

  ngOnInit(): void {
    // this.Load();
    this.service.LoadUserList().subscribe(result => {
      this.len = result;
      console.log(this.sort);
      console.log(result);

      // console.log(result)
      this.count = this.len.length;
      //  console.log(this.count)
      //this.data=result;

    })
    //this.onTableDataChange(this.page);

    if (this.searchData == null || this.searchData == "") {
      this.service.borrowHistoryPagination(this.page, this.tableSize, this.sort).subscribe((result => {
        this.data = result;
        console.log(this.data)
      }));
    }
    else {

      this.data = this.searchData
    }
  }

  // Load() {
  //   this.service.LoadUserList().subscribe((data: any)=>{
  //   this.borrowdata=data;
  //   });  }  

  sortfn(a: any) {

    this.sort = a;
    this.page = this.page;
    this.tableSize = 5;
    this.ngOnInit();

  }
  ObjSampleForm: FormGroup = new FormGroup(
    {
      date1: new FormControl('', [Validators.required]),
      date2: new FormControl('', [Validators.required]),

    }
  )
  filter:FormGroup = new FormGroup({
    status:new FormControl('',[Validators.required])
  
    })
  

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


  onTableDataChange(event: any) {

    console.log(event)
    this.service.borrowHistoryPagination(event, this.tableSize, this.sort).subscribe((result => {
      this.data = result;
      console.log('hey')
    }),
    );

  }

  home() {
    this.router.navigate(['/userbody'])
  }
  // filter starts
  getFilter() {

    console.log(this.ObjSampleForm)
    // this.page=1  
    this.flag = 1;
    this.service.LoadByIssueDateUser(this.ObjSampleForm.controls['date1'].value, this.ObjSampleForm.controls['date2'].value).subscribe(result => {
      this.len = result;
      console.log(result)
      this.count = this.len.length;
      console.log('1111',this.sort);
    })

    
       this.service.filterBorrowPagination2(this.ObjSampleForm.controls['date1'].value, this.ObjSampleForm.controls['date2'].value, this.page, this.tableSize, this.sort).subscribe({
         next: (res: any) => {
           console.log('filter',res);
           console.log(this.ObjSampleForm.controls['date1'].value);
           this.data = res;
       },
       });
  }

  display(){
console.log('display works')
  }
  
  clearFilter() {
    this.flag = 0;
    window.location.reload();
  }

  sortfilter(a: any) {

    this.sort = a;
    this.page = this.page;
    this.tableSize;

    if (this.flag == 0) {
      this.ngOnInit();
    }

    else if (this.flag = 1) {
      this.getFilter();
    }

  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

