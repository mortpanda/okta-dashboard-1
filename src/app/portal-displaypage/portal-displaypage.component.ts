import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portal-displaypage',
  templateUrl: './portal-displaypage.component.html',
  styleUrls: ['./portal-displaypage.component.css']
})
export class PortalDisplaypageComponent implements OnInit {

  constructor() { }

  async ngOnInit() {
    document.getElementById("japanese").style.visibility = "hidden";
    document.getElementById("english").style.visibility = "visible";
  }

}
