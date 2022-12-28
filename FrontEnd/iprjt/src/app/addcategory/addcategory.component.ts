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
  flag:string="ONE";
  constructor(private dialog: MatDialog,private router:Router ,private service:CategoryService) {
    this.categoryList=[];
    
   }

   ngOnInit(): void {
    this.LoadCategory();  

   // this.handleError(HttpErrorResponse)
    localStorage.removeItem('categoryId'); 
  }

  LoadCategory() {
    this.service.LoadCategory().subscribe((data: any)=>{
    this.categorydata=data;
    console.log(data)
    })
    ;  }  


     handleError(err: HttpErrorResponse){
      console.log('hhhii',err);
      if ( err.status === 403) {
        alert("UNAUTHORIZED ACCESS DETECTED")
          this.router.navigateByUrl(`/login`);    }
      }

openDialog() {

  const dialogConfig = new MatDialogConfig();
  this.dialog.open(CategoryComponent, dialogConfig);

}

editCategory(categoryId:any) {
 // localStorage.setItem('flag',this.flag);
  localStorage.setItem('categoryId',categoryId);
  const dialogConfig = new MatDialogConfig();
  this.dialog.open(CategoryComponent, dialogConfig);

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
