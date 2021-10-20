import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { OktaAuth } from "@okta/okta-auth-js";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  strAccessToken;
  strActiveUserFilter = '/api/v1/users?active=true&limit=50';
  strTestStuff;
  strPaginationNext;
  strURL;
  strCounterA;
  strCounterB;
  arrLineRecords;
  arrLinks;
arrsize;

  constructor(private http: HttpClient, private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService) { }
  // private authService: AuthService,private OktaConfig: OktaConfig,private oktaSDKAuth: OktaSDKAuthService

  ngOnInit(): void {
  }

  async GetUsers() {

    await this.OktaAuthClient.OktaSDKAuthClient.session.refresh()
      .then(function (session) {
        // existing session is now refreshed
        console.log(session)
      })
      .catch(function (err) {
        // there was a problem refreshing (the user may not have an existing session)
      });


    //Get Access token from the TokenManager
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    console.log("Access Token : " + this.strAccessToken);
    //console.log(this.strPaginationNext)


    do {
      if (this.strPaginationNext = 'undefined') {
        this.strURL = this.OktaConfig.strBaseURI + this.strActiveUserFilter;
        console.log("Pagination URL is not present so setting the endpoint to : " + this.strURL);
      }
      if (this.strPaginationNext !== 'undefined') {
        this.strURL = this.strPaginationNext;
        console.log("Found pagination URL so setting the endpoint to : " + this.strURL);
      }

      this.http.get<any>(this.strURL, {
        headers: {
          'Authorization': 'Bearer ' + this.strAccessToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        observe: 'response',
      }).subscribe((data: any) => {
        // Use the data returned by the API
        var oktausers = data.body;
        console.log(oktausers)


        this.arrLinks = data.headers.get('link').split(",");
        console.log(this.arrLinks.length);
        this.arrsize = this.arrLinks.length;
        for (this.strCounterA = 0; this.strCounterA < this.arrLinks.length; this.strCounterA++) {
          console.log(this.arrLinks[this.strCounterA])
          this.arrLineRecords = this.arrLinks[this.strCounterA].split(";")


          if (this.arrLineRecords[1] = 'rel="next"') {
            console.log(this.arrLineRecords[0]);
            this.strPaginationNext = this.arrLineRecords[0];
          }
        }


      }, (err) => {
        console.error(err);
      });
    } while (this.arrsize !== 2);

  }

}