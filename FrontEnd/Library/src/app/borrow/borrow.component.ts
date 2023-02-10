import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BorrowService } from '../borrow.service';
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
  curDate = new Date()
  myDate: any;
  filename: any;
  data1: number = 0;
  borrowId: any;
  borrowdata: any;
  booksdata: any;
  d1: number = 0;
  date: any;
  data: any;
  page: number = 1;
  count: any;
  tableSize: number = 5;
  a: any;
  b: any;
  sort1: string = "borrowId";
  sort: string = "borrow_id";
  flag: number = 0;
  flag1: number = 0;
  result: any;
  direction = 1;
  direction1 = -1;
  status = 1;
  selectedGroup: any;
  selected = "status";
  constructor(private router: Router,
    private datePipe: DatePipe,
    private service: BorrowService,
    private toast: NgToastService) {

    this.date = new Date();
  }


  ngOnInit(): void {

    this.date = new Date();

    sessionStorage.clear();
    localStorage.removeItem('borrowId');
    this.LoadData();
    console.log("flg=", this.flag);


  }

  LoadData() {
    this.service.borrowPagination(this.page, this.tableSize, this.sort1, this.direction).subscribe(result => {
      this.result = result.content;
      this.count = result.totalElements
      this.data = this.result;
    });
  }

  ObjSampleForm: FormGroup = new FormGroup(
    {
      date1: new FormControl('', [Validators.required]),
      date2: new FormControl('', [Validators.required]),

    })


  filter: FormGroup = new FormGroup({
    status: new FormControl('', [Validators.required])

  })

  disp1() {

    if (this.filter.controls['status'].value == 1) {
      console.log('/////------------=', this.status)
      this.service.AdminStatusfilterBorrow(this.page, this.tableSize, this.sort, this.direction, 1).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements
        this.data = this.result;
        this.flag = 2;

        if (response.content.length !== 0) {
          this.data1 = 0;
        }
        else if (response.content.length == 0) {
          this.data1 = 1;
        }

      });
    }
    else if (this.filter.controls['status'].value == 2) {

      this.service.AdminStatusfilterBorrow(this.page, this.tableSize, this.sort, this.direction, 2).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements
        this.data = this.result;
        this.flag = 3;

        if (response.content.length != 0) {
          this.data1 = 0;
        }
        else if (response.content.length == 0) {
          this.data1 = 1;
        }

      });
    }

    else if (this.filter.controls['status'].value == 3) {

      this.service.AdminStatusfilterBorrow(this.page, this.tableSize, this.sort, this.direction, 3).subscribe(response => {
        this.result = response.content;
        this.data = this.result;
        this.flag = 4;

        if (response.content.length != 0) {
          this.data1 = 0;
        }
        else if (response.content.length == 0) {
          this.data1 = 1;
        }

      });
    }

    else if (this.filter.controls['status'].value == 4) {

      this.service.AdminStatusfilterBorrow(this.page, this.tableSize, this.sort, this.direction, 4).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements
        this.data = this.result;
        this.flag = 5;
        console.log("--", response.content.length);

        if (response.content.length != 0) {
          this.data1 = 0;
        }
        else if (response.content.length == 0) {
          this.data1 = 1;
        }

      });
    }
    else {
      this.flag = 0;

      this.data1 = 0;

      this.LoadData();
    }

  }


  dwn() {

    if (this.flag == 0) {

      this.myDate = this.datePipe.transform(this.curDate, 'yyyy-MM-dd');
      this.filename = "LibraryBorrowExport_" + this.myDate;
      this.service.export().subscribe((blob: any) => saveAs(blob, this.filename))
    }

    else if (this.flag == 1) {

      this.myDate = this.datePipe.transform(this.curDate, 'yyyy-MM-dd');
      this.filename = "LibraryBorrowExport_" + this.myDate;
      this.service.exportOnFilter(this.ObjSampleForm.controls['date1'].value, this.ObjSampleForm.controls['date2'].value).subscribe((blob: any) => saveAs(blob, this.filename))
    }



  }



  sortfn(a: any) {

    this.sort1 = a;

    if (this.direction == 1) {
      this.direction = -1;
      this.ngOnInit();
    }

    else {
      this.direction = 1;
      this.ngOnInit();
    }


  }

  sortfilter(a: any) {

    this.sort = a;

    if (this.direction1 == 1) {
      this.direction1 = -1;
      this.getFilter();
    }

    else {
      this.direction1 = 1;
      this.getFilter();
    }
  }


  getFilter() {
    if (this.d1 == 2) {
      this.flag = 1;
      this.service.filterBorrowPagination(this.ObjSampleForm.controls['date1'].value, this.ObjSampleForm.controls['date2'].value, this.page, this.tableSize, this.sort, this.direction1).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements
        this.data = this.result;

        if (this.result.length !== 0) {
          this.data1 = 0;
        }
        else if (this.result.length == 0) {
          this.data1 = 1;

        }

      });
    }
    else
      this.toast.warning({ detail: 'Warning', summary: 'Choose start and end dates ', duration: 5000 });

  }



  clearFilter() {
    this.flag = 0;
    this.ObjSampleForm.reset();
    this.LoadData();
  }


  onTableDataChange(event: any) {

    if (this.flag == 0) {

      this.service.borrowPagination(this.page, this.tableSize, this.sort1, this.direction).subscribe(result => {
        this.result = result.content;
        this.count = result.totalElements

        this.data = this.result;
      });
    }
    else if (this.flag == 1) {

      this.service.filterBorrowPagination(this.ObjSampleForm.controls['date1'].value, this.ObjSampleForm.controls['date2'].value, this.page, this.tableSize, this.sort, this.direction1).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements

        this.data = this.result;

      });
    }

    else if (this.flag == 2) {

      this.service.AdminStatusfilterBorrow(this.page, this.tableSize, this.sort, this.direction, 1).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements

        this.data = this.result;

      });
    }
    else if (this.flag == 3) {

      this.service.AdminStatusfilterBorrow(this.page, this.tableSize, this.sort, this.direction, 2).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements

        this.data = this.result;

      });
    }
    else if (this.flag == 4) {

      this.service.AdminStatusfilterBorrow(this.page, this.tableSize, this.sort, this.direction, 3).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements

        this.data = this.result;

      });
    }
    else if (this.flag == 5) {

      this.service.AdminStatusfilterBorrow(this.page, this.tableSize, this.sort, this.direction, 4).subscribe(response => {
        this.result = response.content;
        this.count = response.totalElements

        this.data = this.result;

      });
    }

  }


  acceptRequest(borrow: any) {

    localStorage.setItem('borrowId', borrow.borrowId)
    this.router.navigate(['/acceptrequest'])
  }


  rejectRequest(borrow: any) {

    localStorage.setItem('borrowId', borrow.borrowId)
    this.router.navigate(['/rejectrequest'])

  }

  bookReturn(borrow: any) {

    if (borrow.paymentStatus == "UNPAID") {
      alert("FINE IS NOT PAIDED")
    }
    else {
      this.service.bookReturn(borrow.borrowId).subscribe({
        next: (Response: any) => {

          this.toast.success({ detail: 'Book Returned', summary: 'Book ' + borrow.books.booksName + ' Returned by ' + borrow.user.firstName, duration: 5000 });
          // setTimeout(() => {
          this.LoadData()
          // }, 2500);
        },
        error: (Response: any) => {
          alert("invalid Borrow details")
        }
      })
      this.router.navigate(['/borrow'])
    }
  }
  datas() {
    this.val = this.ObjSampleForm.controls['date1'].value;


    if (this.d1 == 0) {
      this.d1 = 1;

    }
    else if (this.d1 == 1) {
      this.d1 = 2;
    }

    if (this.ObjSampleForm.controls['date1'].value != null) {
      this.d1 = 1;
    }

  }

  datas1() {

    if (this.d1 == 1) {
      this.d1 = 2;

    }
    else if (this.d1 == 0) {
      this.d1 = 1;
    }


  }


  undo(borrow: any) {
    alert(" Are you want to undo last change?")
    this.service.undo(borrow.borrowId).subscribe({
      next: (Response: any) => {
        alert(" Book Returned status revoked")
        window.location.reload()
      },
      error: (Response: any) => {
        alert("invalid Borrow details")
      }
    })
    this.router.navigate(['/borrow'])
  }


  DetailView(borrow: any) {

    this.router.navigate(['/borrow-detail-view', borrow.borrowId])

  }






}






