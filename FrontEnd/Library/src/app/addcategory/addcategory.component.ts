import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit  {

  categoryList: any[];
  categoryId:any;
  categorydata:any;

data: any;
page:number=1;
count: any;
tableSize: number = 5;
a:any;
b:any;

sort:string="categoryId";
sort1:string="categoryName";
len: any;
result: any;
  booksCount: any;
  direction=-1;
  category_id: any;
  categoryName: any;
  category_name: any;
  constructor(private dialog: MatDialog,
    private router:Router ,
    private service:CategoryService,
    private toast : NgToastService
    ) {
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
      this.data=this.result; 
      this.categorydata=this.result;                   
        }); }  


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
    this.LoadCategory(); 
    }
    
  }

  onTableDataChange(event:any) {
  
      this.service.CatPageAdmin(this.page,this.tableSize,this.sort,this.direction).subscribe(result=>{
        this.result=result.content;
        this.count=result.totalElements
        this.data=this.result;   
        this.categorydata=this.result;                     
          })       
    }
  

openDialog() {


  this.dialog.open(CategoryComponent,
    {
      // width:'25%',height:'35%'
      width:'auto+50px',height:'auto'
    
    }
    );


}

editCategory(categoryId:any) {

  localStorage.setItem('categoryId',categoryId);

  this.dialog.open(CategoryComponent,
    {
      closeOnNavigation: true,
      width:'auto',height:'auto'

    }
    );
    this.router.events
    .subscribe(() => {
      this.dialog.closeAll();
    });

}




deleteCategory(category:any): void{
  if(confirm('Are you sure want to delete?'))
  {
    

  this.service.delete(category.categoryId).subscribe({next:(res)=>{
   
    this.toast.error({detail:'Success',summary:'The Category '+category.categoryName+' Deleted',duration:5000}); 
    setTimeout(() => {
    window.location.reload()       
  }, 1500);
  
  },
  error:(msg)=>{}      
  })
 }
 else{
  this.router.navigate(['/addcategory'])
 }
}
 }
