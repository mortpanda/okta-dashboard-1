import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(router: Router) {

    // router.events.forEach(event => {
    //   if (event instanceof NavigationStart) {
    //     switch (event.url) {
    //       case '/home':
    //       case '/portal':
    //         break;
    //       default:

    //         break;
    //     }
    //   }
    // });
  }

  async ngOnInit() {
    document.getElementById("japanese").style.visibility = "hidden";
    document.getElementById("english").style.visibility = "visible";
  }

}
