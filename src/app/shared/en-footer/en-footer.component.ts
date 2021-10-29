import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-en-footer',
  templateUrl: './en-footer.component.html',
  styleUrls: ['./en-footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnFooterComponent implements OnInit {
  test : Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
