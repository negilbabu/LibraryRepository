import { Component, OnInit } from '@angular/core';
import { MinValidator } from '@angular/forms';
import { Router,Route } from '@angular/router';
import { BorrowService } from '../borrow.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// Chart.register(Colors);

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  borrowdata: any;
  len:any;
  i:number=0;
  j:number=0;
  inlen:any;
  label:any []=[];
  count:any[]=[];
    mychart: any
    barchart:  any;
    bar: any;
  constructor(private router:Router,private borrowService:BorrowService) { }

  ngOnInit(): void {
 


this.borrowService.chartbar().subscribe(res=>{
console.log("res=",res);

this.bar=res;
this.barchart = new Chart("bar", {
  type: 'bar', //this denotes the type of chart
  data: { //values on X-Axis
    labels:res.label, 
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
    aspectRatio:3.3
  } 
});






})


}





}