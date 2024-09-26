import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-notfound',
  templateUrl: './page-notfound.component.html',
  styleUrls: ['./page-notfound.component.css']
})
export class PageNotfoundComponent implements OnInit {


  constructor(private router:Router,private _location: Location) { }

  ngOnInit(): void {
  }
  home() {

    this._location.back();
    
  //  this.router.navigate(['/body'])
    }
}
