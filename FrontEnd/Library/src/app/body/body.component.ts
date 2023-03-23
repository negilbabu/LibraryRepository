import { Component, OnInit } from '@angular/core';
import { MinValidator } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { Chart, registerables } from 'chart.js';
import { BooksService } from '../books.service';
Chart.register(...registerables);


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  borrowdata: any;
  len: any;
  i: number = 0;
  j: number = 0;
  inlen: any;
  label: any[] = [];
  count: any[] = [];
  mychart: any
  barchart: any;
  bar: any;
  constructor(private router: Router, private borrowService: BorrowService, private booksService: BooksService) { }

  ngOnInit(): void {
    this.piechart();
    this.chart();
  }



  chart() {
    this.borrowService.chartbar().subscribe(res => {
console.log("=>",res)
      this.bar = res;
      this.barchart = new Chart("bar", {
        type: 'bar', //this denotes the type of chart
        data: { //values on X-Axis
          labels: res.label,
          datasets: [
            {
              label: "ISSUE COUNT",
              data: res.issueCount,
              backgroundColor: 'white'
            },
            {
              label: "RETURN COUNT",
              data: res.returnedCount,
              backgroundColor: 'green'
            }
          ]
        },
        options: {
          aspectRatio: 3.6
        }
      });

    })

  }

  piechart() {
    this.booksService.chart().subscribe(res => {

      this.len = res.length;
      this.inlen = res[0].length;
      for (this.i = 0; this.i < this.len; this.i++) {
        for (this.j = 0; this.j < this.inlen; this.j++) {
          let t = this.i;
          let q = this.j
          this.count[this.i] = res[this.i][0];
          this.label[this.i] = res[t][1];
        }

      }


      this.mychart = new Chart("MyChart", {
        type: 'pie', //this denotes the type of chart
        data: { //values on X-Axis
          labels: this.label,
          datasets: [

            {
              label: "BOOK COUNT",
              data: this.count,
              backgroundColor: ['lightgreen', 'black', 'darkgreen', 'grey', 'skyblue', 'magentha', 'orange']
            }
          ]
        },
        options: {
          aspectRatio: 3.3
        }
      });



    })


  }



}