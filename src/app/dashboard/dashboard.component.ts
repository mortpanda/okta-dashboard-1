import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
//import { OktaAuth } from "@okta/okta-auth-js";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  strAccessToken;
  //strActiveUserFilter = '/api/v1/users?after=000uq07q15TTHkPxJa1d6&limit=50';
  strActiveUserFilter = '/api/v1/users?active=true&limit=10';
  strTestStuff;
  strPaginationNext;
  strURL;
  strCounterA;
  strCounterB;
  arrLineRecords;
  arrLinks;
  arrsize;
  strResponseBody;
  strResponse;
  strPagLinks;
  boolPagination;

  constructor(private http: HttpClient, private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService,private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  async GetUsers() {
    console.log('get cookie : ' + this.cookieService.get('paginationURL'));
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

    // // if (this.strPaginationNext = 'undefined') {
    // this.strURL = this.OktaConfig.strBaseURI + this.strActiveUserFilter;
    // //   console.log("Pagination URL is not present so setting the endpoint to : " + this.strURL);
    // // }
    // // if (this.strPaginationNext.length > 10) {
    // //   this.strURL = this.strPaginationNext;
    // //   console.log("Found pagination URL so setting the endpoint to : " + this.strURL);
    // // }
    this.strPaginationNext = "0";

    const strGetandProcessInfo = async () => {
      console.log('Starting url : ' + this.strURL);
      //this.strURL = this.strPaginationNext;
      //console.log(this.strURL);
      const strUserList = await this.strResponse.strJsonBody;
      this.strResponseBody = strUserList;
      //console.log("number of records : "+this.strResponseBody.length);
      console.log(this.strResponseBody);
      const strPagLinkCol = await this.strResponse.strLinks;
      this.strPagLinks = strPagLinkCol;
      console.log('Found links : ' + this.strPagLinks);

      //Work on the pagination links
      this.arrLinks = this.strPagLinks.split(",");
      console.log("Number of links : " + this.arrLinks.length);
      switch (this.arrLinks.length) {
        case 2:
          //console.log("Number of records in link array : " + this.arrLinks.length)
          for (this.strCounterA = 0; this.strCounterA < this.arrLinks.length; this.strCounterA++) {
            //console.log(this.arrLinks[this.strCounterA])
            this.arrLineRecords = this.arrLinks[this.strCounterA].split(";")

            if (this.arrLineRecords[1] = 'rel="next"') {

              switch (this.arrLineRecords[0].includes("after=")) {
                case true: {
                  console.log("Found a link that looks like a pagination URL...")
                  this.boolPagination = true;
                  this.strPaginationNext = "";
                  this.strPaginationNext = this.arrLineRecords[0];
                  this.strPaginationNext = this.strPaginationNext.replace('>', '')
                  this.strURL = this.strPaginationNext.replace('<', '');
                  console.log("Pagination URL is : " + this.strURL);
                  this.cookieService.set('paginationURL',this.strURL );
                  //console.log(this.boolPagination);
                  
                  break;
                }

                case false: {
                  this.boolPagination = false;
                  //console.log(this.boolPagination);
                  this.strPaginationNext = '0';
                  break;
                }
              }
              (err) => {
                console.error(err);
              };

            }
            console.log('Is the URL ' + this.arrLineRecords[0] + ' a pagination URL? : ' + this.boolPagination);
          }

      }

    }
/////  
//while ()

    if (this.strPaginationNext = "0") {
      this.strURL = this.OktaConfig.strBaseURI + this.strActiveUserFilter;
      //this.boolPagination = false;
    }
    else {
      this.strURL = this.strPaginationNext;
      //this.boolPagination = true;
    }
    console.log('URL to call : ' + this.strURL)
    // while (this.boolPagination = false); {

    //   switch (this.strURL.includes("after=")) {
    //     case true: {
    //       this.boolPagination = true;
    //       //console.log("Pagination URL is : " + this.strPaginationNext);
    //       console.log("Pagination URL is : " + this.strURL);
    //       console.log("Pagination url : " + this.boolPagination)
    //       break;
    //     }

    //     case false: {
    //       this.boolPagination = false;
    //       console.log("the URL is : " + this.strURL);
    //       console.log("Pagination url : " + this.boolPagination)
    //       break;
    //     }
    //   }
    //   (err) => {
    //     console.error(err);
    //   };
    
    this.strResponse = await fetch(this.strURL, {
      headers: new Headers({
        'Authorization': 'Bearer ' + this.strAccessToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
    })
      .then(function (response) {
        var strJsonBody = response.json();
        var strLinks = response.headers.get("link");
        return { strJsonBody, strLinks }
      })

    strGetandProcessInfo();
/////

      

    // }
  }

}


//   await this.http.get<any>(this.strURL, {
    //     headers: {
    //       'Authorization': 'Bearer ' + this.strAccessToken,
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     observe: 'response',
    //   }).subscribe((data: any) => {
    //     // Use the data returned by the API

    //     var oktausers = data.body;
    //     console.log(oktausers)
    //     this.strResponseBody = oktausers
    //     this.arrLinks = data.headers.get('link').split(",");
    //     console.log(this.arrLinks.length);
    //     this.arrsize=JSON.stringify(this.arrLinks.length);
    //     console.log(this.arrsize)
    //     // switch (this.arrLinks.length){
    //     //   case 2:
    //     //     console.log("Number of records in array : " + this.arrLinks.length)
    //     //     for (this.strCounterA = 0; this.strCounterA < this.arrLinks.length; this.strCounterA++) {
    //     //       console.log(this.arrLinks[this.strCounterA])
    //     //       this.arrLineRecords = this.arrLinks[this.strCounterA].split(";")

    //     //       if (this.arrLineRecords[1] = 'rel="next"') {
    //     //         console.log(this.arrLineRecords[0]);
    //     //         this.strPaginationNext = this.arrLineRecords[0];
    //     //       }
    //     //     }

    //     // }

    //   }, (err) => {
    //     console.error(err);
    //   });
    // // } while (this.arrsize !== 2);
    // console.log(this.strResponseBody);