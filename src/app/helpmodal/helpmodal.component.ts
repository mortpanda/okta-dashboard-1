import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {MatListModule} from '@angular/material/list';



@Component({
  selector: 'app-helpmodal',
  templateUrl: './helpmodal.component.html',
  styleUrls: ['./helpmodal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HelpmodalComponent implements OnInit {
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
