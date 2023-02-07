import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../books.service';
import { BorrowService } from '../borrow.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-borrow-detail-view',
  templateUrl: './borrow-detail-view.component.html',
  styleUrls: ['./borrow-detail-view.component.css']
})
export class BorrowDetailViewComponent implements OnInit {

  borrowId: any;
  borrowdata: any;
  booksdata: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private service: BorrowService,
    private booksService: BooksService) {

  }

  ngOnInit(): void {
    this.borrowId = this.route.snapshot.params['id'];
    this.LoadBorrow(this.borrowId)

  }

  LoadBorrow(borrow: any) {
    this.service.LoadBorrowDetailView(borrow).subscribe((data) => {
      this.borrowdata = data;
      console.log("-",this.borrowdata);
      

      ;
    });

  }


}
