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
  //strActiveUserFilter = '/api/v1/users?&limit=10';
  //strActiveUserFilter = '/api/v1/users?after=000uq07q15TTHkPxJa1d6&limit=10';
  strActiveUserFilter = '/api/v1/users';
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
  PaginationURLValue;
  boolPagination;

  constructor(private http: HttpClient, private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService) { }

  ngOnInit() {

  }

  async GetUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strActiveUserFilter;
    console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
            headers: new Headers({
              'Authorization': 'Bearer ' + stringAccessToken,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            })
          });

        let data = await response.json();
    
        // Extract the url of the response's "next" relational Link header
        let next_page;
        if (/<([^>]+)>; rel="next"/g.test(response.headers.get("link"))) {
          next_page = /<([^>]+)>; rel="next"/g.exec(response.headers.get("link"))[1];
        }
    
        // If another page exists, merge its output into the array recursively
        if (next_page) {
          data = data.concat(await fetchRequest(next_page));
        }
        return data;
      } catch (err) {
        return console.error(err);
      }
    }
    /////////////////////////////////////
    
    /////////////////////////////////////
    fetchRequest(this.strURL).then(data =>
      console.log(data.length)
    );
    /////////////////////////////////////
}


// this.strResponse = await fetch(this.strURL, {
//   headers: new Headers({
//     'Authorization': 'Bearer ' + this.strAccessToken,
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   })
// })
//   .then(function (response) {
//     var strJsonBody = response.json();
//     var strLinks = response.headers.get("link");
//     return { strJsonBody, strLinks }
//   })
// const strUserList = await this.strResponse.strJsonBody;
// this.strResponseBody = strUserList;
// //console.log("number of records : "+this.strResponseBody.length);
// console.log(this.strResponseBody);    

// const strPagLinkCol = await this.strResponse.strLinks;
// this.strPagLinks = strPagLinkCol;
// //console.log('Found links : ' + this.strPagLinks);

// var parse = require('parse-link-header');
// var parsed = parse(this.strPagLinks);
// console.log(parsed.next.url);



//this.cookieService.set('pagination', 'true');
    // this.cookieService.set('paginationURL', '0');

    // //console.log('get cookie : ' + this.cookieService.get('paginationURL'));
    // await this.OktaAuthClient.OktaSDKAuthClient.session.refresh()
    //   .then(function (session) {
    //     // existing session is now refreshed
    //     console.log(session)
    //   })
    //   .catch(function (err) {
    //     // there was a problem refreshing (the user may not have an existing session)
    //   });
    // this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);

    // do {
    //   this.boolPagination = this.cookieService.get('pagination');
    //   console.log(this.boolPagination);
    //   console.log('First check + ' + this.cookieService.get('pagination'));
    //   this.PaginationURLValue = this.cookieService.get('paginationURL');
    //   if (this.PaginationURLValue = '0') {
    //     // case '0':
    //       console.log('pagination? : ' + this.PaginationURLValue)
    //       this.strURL = this.OktaConfig.strBaseURI + this.strActiveUserFilter;
    //       console.log('Starting url : ' + this.strURL);
    //   }
    //     else{
    //       console.log('pagination? : ' + this.PaginationURLValue)
    //       this.strURL = this.cookieService.get('paginationURL');

    //   }

    //   const strGetandProcessInfo = async () => {

    //     const strUserList = await this.strResponse.strJsonBody;
    //     this.strResponseBody = strUserList;
    //     //console.log("number of records : "+this.strResponseBody.length);
    //     console.log(this.strResponseBody);
    //     const strPagLinkCol = await this.strResponse.strLinks;
    //     this.strPagLinks = strPagLinkCol;
    //     console.log('Found links : ' + this.strPagLinks);

    //     //Work on the pagination links
    //     this.arrLinks = this.strPagLinks.split(",");
    //     console.log("Number of links : " + this.arrLinks.length);
    //     switch (this.arrLinks.length) {
    //       case 2:

    //         for (this.strCounterA = 0; this.strCounterA < this.arrLinks.length; this.strCounterA++) {

    //           this.arrLineRecords = this.arrLinks[this.strCounterA].split(";")

    //           if (this.arrLineRecords[1] = 'rel="next"') {

    //             switch (this.arrLineRecords[0].includes("after=")) {
    //               case true: {
    //                 console.log("Found a link that looks like a pagination URL...")
    //                 //this.boolPagination = true;
    //                 this.strPaginationNext = "";
    //                 this.strPaginationNext = this.arrLineRecords[0];
    //                 this.strPaginationNext = this.strPaginationNext.replace('>', '')
    //                 this.strURL = this.strPaginationNext.replace('<', '');
    //                 console.log("Pagination URL is and storing to cookie : " + this.strURL);
    //                 this.cookieService.set('pagination', 'true');
    //                 this.cookieService.set('paginationURL', this.strURL);
    //                 //console.log(this.boolPagination);
    //                 this.strURL = " ";
    //                 //break;
    //               }

    //               case false: {
    //                 //this.boolPagination = false;
    //                 //console.log(this.boolPagination);
    //                 this.cookieService.set('pagination', 'false');
    //                 //this.strPaginationNext = '0';
    //                 //break;
    //               }
    //             }
    //             (err) => {
    //               console.error(err);
    //             };

    //           }
    //           if (this.arrLineRecords[1] = 'rel="self"') {
    //             this.cookieService.set('pagination', 'false');

    //           }
    //         }


    //     }

    //   }
    //   /////  



    //   this.strResponse = await fetch(this.strURL, {
    //     headers: new Headers({
    //       'Authorization': 'Bearer ' + this.strAccessToken,
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     })
    //   })
    //     .then(function (response) {
    //       var strJsonBody = response.json();
    //       var strLinks = response.headers.get("link");
    //       return { strJsonBody, strLinks }
    //     })

    //   strGetandProcessInfo();
    //   /////



    //   // }
    // } 

    // while (this.boolPagination=='true'){}
    



    // this.cookieService.set('pagination', 'initial');
    // this.cookieService.set('paginationURL', '0');

    // do {
    //   this.boolPagination = this.cookieService.get('pagination');
    //   console.log('Pagination cookie value : ' + this.boolPagination);
    //   this.PaginationURLValue = this.cookieService.get('paginationURL');
    //   console.log('Pagination URL value : ' + this.PaginationURLValue);

    //   switch (this.boolPagination) {
    //     case 'initial':
    //       this.strURL = this.OktaConfig.strBaseURI + this.strActiveUserFilter;
    //       console.log('Starting URL : ' + this.OktaConfig.strBaseURI + this.strActiveUserFilter);
    //       this.cookieService.set('paginationURL', 'http:/localhost');
    //       this.cookieService.set('pagination', 'true');

    //       this.strResponse = fetch(this.strURL, {
    //         headers: new Headers({
    //           'Authorization': 'Bearer ' + this.strAccessToken,
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //         })
    //       })
    //         .then(function (response) {
    //           var strJsonBody = response.text();
    //           var strLinks = response.headers.get("link");
    //           console.log(strJsonBody);
    //           console.log(strLinks);
              
    //           var arrLinks = strLinks.split(",");
    //           for (var i = 0; i < arrLinks.length; i++) {
    //             console.log(arrLinks[i]);
    //           }
              
              
    //           return { strJsonBody, strLinks }
              
    //         })
            
    //     case 'true':
    //       console.log('intermediate : ' + this.cookieService.get('pagination'));
    //       this.strURL = this.cookieService.get('paginationURL');
    //       console.log(this.strURL);
    //       this.cookieService.set('pagination', 'false');


    //     case 'false':
    //       this.cookieService.set('pagination', 'end of page');
    //       this.cookieService.set('paginationURL', 'no more URLs');
    //       console.log(this.cookieService.get('pagination'));
    //       console.log(this.cookieService.get('paginationURL'));
    //       break;
    //   }

    // } while (this.boolPagination == false) {
    //   console.log('end')
      
    // }
    
    // 
  }