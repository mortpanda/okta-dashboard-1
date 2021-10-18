import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-display-page',
  templateUrl: './dashboard-display-page.component.html',
  styleUrls: ['./dashboard-display-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardDisplayPageComponent implements OnInit {
  private strOktaURI = '';
  private strSSWSKey = '';
  //private strRequestString;
  private strSessionMe;

  private RetOrgURL;
  private RetAPIKey;

  public strConfirmed;
  public strUserID;
  public strWelcome;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  async ngOnInit() {

    this.strSessionMe = '/api/v1/users/me';
    this.strOktaURI = '';
    this.strSSWSKey = '';

    this.strOktaURI = this.cookieService.get('orgURL');
    this.strSSWSKey = this.cookieService.get('orgAPI');

    console.log('You org URL is : ' + this.strOktaURI);
    console.log('You API key is : ' + this.strSSWSKey);
    this.strConfirmed = "";
    this.RetOrgURL = this.strOktaURI;
    this.RetAPIKey = this.strSSWSKey;

    console.log("Your URL is : " + this.RetOrgURL);
    console.log("Your API Key is : " + this.RetAPIKey);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "SSWS " + this.RetAPIKey);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    //Get user with API key found in the cookie
    fetch(this.RetOrgURL + this.strSessionMe, requestOptions)
      //Success
      .then(response => response.json())
      //Error 
      .catch(error => {
        console.log('error', error)

      }
      );
    this.strUserID = await fetch(this.RetOrgURL + this.strSessionMe, requestOptions).then(response => response.json())
    console.log(this.strUserID);
    console.log(this.strUserID.profile.email);
    this.strWelcome = "Welcome "
    this.strConfirmed = this.strUserID.profile.email;

  }


}
