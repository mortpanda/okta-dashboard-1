import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-activetotal',
  templateUrl: './activetotal.component.html',
  styleUrls: ['./activetotal.component.css']
})
export class ActivetotalComponent implements OnInit {
numActiveTotal;
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  GetActiveToalFromCookie(){
    this.numActiveTotal = this.cookieService.get('OktaTotalActiveUsers');
    this.ngOnInit();
  }
}
