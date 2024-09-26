import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';



export interface DialogData {
  categoryName: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {



  categoryId: any;
  categoryName: any;
  data: any;
  test: any;


  ObjSampleForm: FormGroup;

  constructor(
    private router: Router,
    private service: CategoryService,
    private toast: NgToastService,
    private dialog: MatDialog,
  ) {
    this.ObjSampleForm = new FormGroup(
      {
        categoryName: new FormControl('', [Validators.required]),
      }
    );
  }
  ngOnInit(): void {

    this.LoadEdit()

  }

  LoadEdit() {
    let categoryId = localStorage.getItem("categoryId")


    if (categoryId != null) {
      this.service.editCategory(categoryId).subscribe({
        next: (res) => {
          this.categoryId = res.categoryId;
          this.ObjSampleForm.controls['categoryName'].setValue(res.categoryName)

        },
        error: (msg) => { }
      })
    }

  }

  categorydata: any;

  onSubmit() {

    let categoryId = localStorage.getItem("categoryId")

    if (categoryId != undefined) {
      this.updateCategory(categoryId)
    } else {
      this.addCategory()

    }

  }
  
  addCategory() {
    this.service.addCategory(this.ObjSampleForm.value).subscribe({
      next: (result: any) => {


      if (result.categoryId) {
        this.toast.success({ detail: 'Success', summary: 'The Category ' + result.categoryName + ' Added', duration: 5000 });

        setTimeout(() => {     
          this.router.navigate(['/addcategory'])
          this.dialog.closeAll();
          window.location.reload();
          }, 1000);
  
      }
      
      
    },
    error: (Response: any) => {
      console.log(Response)
      if (Response.status == 400) {
        this.toast.warning({ detail: 'Failed', summary: 'Please Fill up the fields', duration: 10000, position: 'tr' })
      }
      else if (Response.status == 500) {
        this.toast.warning({ detail: 'FAILED to add Category', summary: 'INTERNAL SERVER ERROR', duration: 5000, position: 'tr' })
      }

    }
  })

  }


  updateCategory(categoryId: any) {
    let body = {
      categoryName: this.ObjSampleForm.controls['categoryName'].value
    }

    this.service.update(categoryId, body).subscribe({
      next: (Response: any) => {

        this.toast.success({ detail: 'Success', summary: 'The Category - ' + Response.categoryName + ' Edited', duration: 5000 });
        setTimeout(() => {
     
        this.router.navigate(['/addcategory'])
        this.dialog.closeAll();
        window.location.reload();
        }, 1000);

      },
      error: (Response: any) => {
        console.log(Response)
        alert("invalid Category credentials")
      }
    })

    
    localStorage.removeItem('categoryId');


  }
  clear() {
    localStorage.removeItem('categoryId');
    this.ObjSampleForm.reset()
  }



}
