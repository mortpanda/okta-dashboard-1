import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { HttpClientModule } from '@angular/common/http';
import { OktaConfig } from "app/shared/okta/okta-config";


@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigModalComponent implements OnInit {
  private strOktaURI = '';
  private strSSWSKey = '';
  //private strRequestString;
  private strSessionMe;

  private RetOrgURL;
  private RetAPIKey;
  
public strConfirmed;

  constructor(private cookieService: CookieService, private http: HttpClientModule, private OktaConfig: OktaConfig) { }

  async ngOnInit() {

    
    this.strSessionMe = '/api/v1/users/me';
    this.strOktaURI = '';
    this.strSSWSKey = '';

    this.strOktaURI = this.cookieService.get('orgURL');
    this.strSSWSKey = this.cookieService.get('orgAPI');

    console.log('You org URL is : ' + this.strOktaURI);
    console.log('You API key is : ' + this.strSSWSKey);

    (<HTMLInputElement>document.getElementById("orgURL")).value = this.strOktaURI;
    (<HTMLInputElement>document.getElementById("orgAPI")).value = this.strSSWSKey;

  }

  onClose(event: any) {
    console.log(event);
  }

  getCookies() {
    // Set the cookie variables to nothing in case, it's holding on to old values
    this.strOktaURI = '';
    this.strSSWSKey = '';

    this.strOktaURI = this.cookieService.get('orgURL');
    this.strSSWSKey = this.cookieService.get('orgAPI');
    console.log('Fetching information in cookies....');
    console.log('You org URL is : ' + this.strOktaURI);
    console.log('You API key is : ' + this.strSSWSKey);

    (<HTMLInputElement>document.getElementById("orgURL")).value = this.strOktaURI;
    (<HTMLInputElement>document.getElementById("orgAPI")).value = this.strSSWSKey;


  }

  async authenticateOkta() {
    this.strConfirmed = "";
    // this.strOktaURI = '';
    // this.strSSWSKey = '';

    // this.RetOrgURL = "";
    // this.RetAPIKey = "";

    // this.strOktaURI = this.cookieService.get('orgURL');
    // this.strSSWSKey = this.cookieService.get('orgAPI');


    // (<HTMLInputElement>document.getElementById("orgURL")).value = this.strOktaURI;
    // (<HTMLInputElement>document.getElementById("orgAPI")).value = this.strSSWSKey;


    this.RetOrgURL = (<HTMLInputElement>document.getElementById("orgURL")).value;
    this.RetAPIKey = (<HTMLInputElement>document.getElementById("orgAPI")).value;
    
    console.log(this.RetOrgURL);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.RetOrgURL + this.strSessionMe);
    xhr.onload = () => {
      console.log('Response is ' + xhr.status);
      this.strConfirmed = "API Key has been verified against the org";
    };
    xhr.onerror = () => {
      console.log("error!");
      this.strConfirmed = "Failed!  Please enter the correct information";
    };
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "SSWS " + this.RetAPIKey);
    xhr.send();
    
    

    
  }

  setCookie() {

    console.log('Delete existing cookies first');
    this.cookieService.delete('orgURL');
    this.cookieService.delete('orgAPI');

    console.log('Reading from input fields');
    this.strOktaURI = (<HTMLInputElement>document.getElementById("orgURL")).value;
    this.strSSWSKey = (<HTMLInputElement>document.getElementById("orgAPI")).value;
    console.log("Your org URL is " + this.strOktaURI);
    console.log("Your API key is " + this.strSSWSKey);
    console.log("Saving to cookie....");

    this.cookieService.set('orgURL', this.strOktaURI);
    this.cookieService.set('orgAPI', this.strSSWSKey);

  }

  deleteCookie() {
    this.cookieService.delete('name');
  }

  deleteAll() {
    this.cookieService.deleteAll();
  }


}


