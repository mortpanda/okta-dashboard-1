import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
