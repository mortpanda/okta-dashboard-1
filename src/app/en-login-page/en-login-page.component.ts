import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-en-login-page',
  templateUrl: './en-login-page.component.html',
  styleUrls: ['./en-login-page.component.css']
})
export class EnLoginPageComponent implements OnInit {

  constructor() { }

  async ngOnInit() {
    document.getElementById("english").style.visibility = "hidden";
    document.getElementById("japanese").style.visibility = "visible";
  }

}
