import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

//booksdata:any;
userdata: any;
userList:any[];


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
sort:string="userId";
len: any;
result: any;
  booksCount: any;
  direction=-1;
userId: any;

  constructor(private router:Router ,private service:UserserviceService) {
    this.userList=[];
   }

  ngOnInit(): void {

    
    this.Load();
  }

  DetailView(user:any){
    sessionStorage.setItem('userId',user.userId)
    this.router.navigate(['/user-detailview'])
  }

   Load(){


  this.service.userPaginationAdmin(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
    this.result=result.content;
    this.count=result.totalElements
    console.log("loaded books=",this.result);   
    console.log("page=",this.page);  
    this.data=this.result; 
    this.userdata=this.result;                   
      });
}  

sortfn(a:any){    
  this.sort=a;      
  this.page=this.page;
  this.tableSize;

  if(this.direction==1){
    this.direction=-1;
    console.log("from desc to :",this.direction)
    this.ngOnInit();       
  }

  else{
    this.direction=1;
    console.log("from asc to desc",this.direction)
  this.ngOnInit(); 
  }
  
}

onTableDataChange(event:any) {
  
  console.log("page=",event)
    this.service.userPaginationAdmin(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
      this.result=result.content;
      this.count=result.totalElements
      console.log("loaded books=",this.result);   
      this.data=this.result;   
      this.userdata=this.result;                     
        })       
  }

  

}
