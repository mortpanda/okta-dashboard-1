import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-en-footer',
  templateUrl: './en-footer.component.html',
  styleUrls: ['./en-footer.component.css']
})
export class EnFooterComponent implements OnInit {
  test : Date = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
