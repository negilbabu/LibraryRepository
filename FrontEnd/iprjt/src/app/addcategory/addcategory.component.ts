import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { MatDialog,MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit  {

  categoryList: any[];
  categoryId:any;
  categorydata:any;
  // flag:string="ONE";


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
sort:string="categoryId";
sort1:string="categoryName";
len: any;
result: any;
  booksCount: any;
  direction=-1;
  category_id: any;
  categoryName: any;
  category_name: any;
  constructor(private dialog: MatDialog,private router:Router ,private service:CategoryService) {
    this.categoryList=[];
    
   }

   ngOnInit(): void {

    this.LoadCategory();  
    localStorage.removeItem('categoryId'); 
  }

  LoadCategory() {
    this.service.CatPageAdmin(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
      this.result=result.content;
      this.count=result.totalElements
      console.log("loaded cat=",this.result);   
      console.log("page=",this.page);  
      this.data=this.result; 
      this.categorydata=this.result;                   
        }); }  


  sortfn(a:any){    
    this.sort=a;
    console.log("sortbyname",a)    
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
    this.LoadCategory(); 
    }
    
  }

  onTableDataChange(event:any) {
  
    console.log("page=",event)
      this.service.CatPageAdmin(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
        this.result=result.content;
        this.count=result.totalElements
        console.log("loaded books=",this.result);   
        this.data=this.result;   
        this.categorydata=this.result;                     
          })       
    }
  

openDialog() {

  const dialogConfig = new MatDialogConfig();
  this.dialog.open(CategoryComponent,
    {
      width:'25%',height:'40%'
    
    }
    );

//   this.matdialog.open(ChangePassComponent,{
      
//     width: '60%'
// });

}

editCategory(categoryId:any) {
 // localStorage.setItem('flag',this.flag);
  localStorage.setItem('categoryId',categoryId);
  const dialogConfig = new MatDialogConfig();
  this.dialog.open(CategoryComponent,
    {
      width:'25%',height:'40%'
    
    }
    );

}




deleteCategory(categoryId:any): void{
  if(confirm('Are you sure want to delete?'))
  {
 console.log(categoryId);
  this.service.delete(categoryId.categoryId).subscribe({next:(res)=>{
    console.log(res);
    alert("item deleted");
    window.location.reload();
  },
  error:(msg)=>{}      
  })
 }
 else{
  this.router.navigate(['/addcategory'])
 }
}














 }
