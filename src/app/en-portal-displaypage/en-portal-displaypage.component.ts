import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-en-portal-displaypage',
  templateUrl: './en-portal-displaypage.component.html',
  styleUrls: ['./en-portal-displaypage.component.css']
})
export class EnPortalDisplaypageComponent implements OnInit {

  constructor() { }

  async ngOnInit() {
    document.getElementById("japanese").style.visibility = "visible";
    document.getElementById("english").style.visibility = "hidden";
  }

}
