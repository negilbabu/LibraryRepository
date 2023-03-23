import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { NgToastService } from 'ng-angular-popup';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {


  categoryList: any[];
  categoryId: any;
  categorydata: any;
  noValue=0;

  data: any;
  page: number = 1;
  count: any;
  tableSize: number = 5;
  a: any;
  b: any;
  key: any;
  sort: string = "category_name";
  sort1: string = "categoryName";
  result: any;
  direction = -1;
  category_id: any;
  categoryName: any;
  category_name: any;
  selected = 5;
  selectedGroup= 5;
displayStyle: any;
rslt=0;
  constructor(private dialog: MatDialog,
    private router: Router,
    private service: CategoryService,
    private toast: NgToastService
  ) {
    this.categoryList = [];

  }

  search: FormGroup = new FormGroup({
    inp: new FormControl()
  })

  filter: FormGroup = new FormGroup({
    status: new FormControl()

  })

  ngOnInit(): void {
    // this.disp1()

    this.LoadCategory();
    localStorage.removeItem('categoryId');
  }

  LoadCategory() {
    this.key="";
    this.service.CatPageAdmin(this.key,this.page, this.tableSize, this.sort, this.direction).subscribe(result => {
      this.result = result.content;
      this.count = result.totalElements
      this.data = this.result;
      this.categorydata = this.result;
    });

  }

  openPopup() {
    this.rslt=1;
    
    this.displayStyle = "block";
   
  }
  
  closePopup() {
this.rslt=0;
this.displayStyle = "none"
    }

  disp1() {
    
      this.tableSize=this.filter.controls['status'].value;
      this.LoadCategory();

  }

  Search(key:any) {
    this.service.CatPageAdmin(key,this.page, this.tableSize, this.sort, this.direction).subscribe(result => {
      this.result = result.content;
      this.count = result.totalElements
      this.data = this.result;
      this.categorydata = this.result;

      if (this.result.length == 0) {
        this.noValue = 1;        
      }
      else{
        this.noValue = 0; 
      }
    });

  }


  sortfn(a: any) {
    this.sort = a;
    this.page = this.page;
    this.tableSize;

    if (this.direction == 1) {
      this.direction = -1;
      this.LoadCategory();
    }

    else {
      this.direction = 1;
      this.LoadCategory();
    }

  }

  onTableDataChange(event: any) {
    // this.key="";
    this.service.CatPageAdmin(this.key,this.page, this.tableSize, this.sort, this.direction).subscribe(result => {
      this.result = result.content;
      this.count = result.totalElements
      this.data = this.result;
      this.categorydata = this.result;
    })
  }


  openDialog() {


    this.dialog.open(CategoryComponent,
      {
        // width:'25%',height:'35%'
        width: 'auto+50px', height: 'auto'

      }
    );
    


  }

  editCategory(categoryId: any) {

    localStorage.setItem('categoryId', categoryId);
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(CategoryComponent,
      {
        closeOnNavigation: true,
        width: 'auto', height: 'auto'

      }

    );

    this.LoadCategory();
    // this.ngOnInit();

  }






  deleteCategory(category: any): void {
    if (confirm('Are you sure want to delete?')) {


      this.service.delete(category.categoryId).subscribe({
        next: (res) => {

          this.toast.error({ detail: 'Success', summary: 'The Category ' + category.categoryName + ' Deleted', duration: 5000 });


          this.LoadCategory()
         

        },
        error: (msg) => {
          if(msg.status==400){
            this.toast.warning({ detail: 'Failed', summary: 'Category ' + category.categoryName + ' cannot be Deleted', duration: 15000 });
          }
          else
          this.toast.warning({ detail: 'Failed', summary: 'Something went wrong', duration: 5000 });
         }
      })
    }
    else {
      this.router.navigate(['/addcategory'])
    }
  }
}
