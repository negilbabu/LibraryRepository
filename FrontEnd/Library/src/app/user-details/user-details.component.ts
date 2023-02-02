import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


userdata: any;



data: any;
page:number=1;
count: any;
tableSize: number = 5;
a:any;
b:any;
sort:string="role";
len: any;
result: any;
  booksCount: any;
  direction=-1;
userId: any;

  constructor(private router:Router ,private service:UserserviceService) {

   }

  ngOnInit(): void {

    
    this.Load();
  }

  DetailView(user:any){
    localStorage.setItem('userId',user.userId)
    this.router.navigate(['/user-detailview',user.userId])
  }

   Load(){


  this.service.userPaginationAdmin(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
    this.result=result.content;
    this.count=result.totalElements
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
    this.ngOnInit();       
  }

  else{
    this.direction=1;
  this.ngOnInit(); 
  }
  
}

onTableDataChange(event:any) {
  

    this.service.userPaginationAdmin(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
      this.result=result.content;
      this.count=result.totalElements
      this.data=this.result;   
      this.userdata=this.result;                     
        })       
  }

  

}
