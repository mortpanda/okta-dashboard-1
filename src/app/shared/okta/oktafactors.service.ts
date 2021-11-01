import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { CookieService } from 'ngx-cookie-service';
import { OktaApiEndpoints } from 'app/shared/okta/okta-api-endpoints';
// Needs to be the below versions
//npm install ng2-charts@2.3.0 --save
// npm i chart.js@2.9.0
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { Color } from 'ng2-charts';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatTableModule } from '@angular/material/table';
// import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class OktafactorsService {

//  secondsSinceEpoch;
  strAccessToken;
  strURL;
  arrMFAJson: any = {};
  intArrayMFASize;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

    ngOnInit(): void {

    }

    async GetMFA() {

      
      
      this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
      console.log(this.strAccessToken);
      const UpdateMFAs = async () => {
        const strResult = await this.FunctionGetMFA(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strMFAMethods, this.strAccessToken)
      }
      await UpdateMFAs();
      
  
    }
  
    async FunctionGetMFA(strURL, myToken) {
      localStorage.removeItem('okta_mfas')
      console.log('Calling... : ' + strURL);
      /////////////////////////////////////
      /////////////////////////////////////
      async function fetchRequest(url) {
        try {
          // Fetch request and parse as JSON
          const response = await fetch(url, {
            headers: new Headers({
              'Authorization': 'Bearer ' + myToken,
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
      // Work on the data
      /////////////////////////////////////
      await fetchRequest(strURL).then(data => {
        var aggregateMFAData = [];
        this.intArrayMFASize = 0;
        aggregateMFAData = aggregateMFAData.concat(data)
        for (var i = 0; i < aggregateMFAData.length; i++) {
          this.intArrayMFASize = Number(this.intArrayMFASize) + 1
  
        }
        console.log(aggregateMFAData);
        this.arrMFAJson = aggregateMFAData;
      }
      )
      // Output from the get group function
      this.arrMFAJson.length = this.intArrayMFASize;
      //console.log(this.arrUserJson);
      const oktaUsers = JSON.stringify(this.arrMFAJson);
      //Save to local storate
      localStorage.setItem('okta_mfas', oktaUsers);
      await fetchRequest(strURL);
      
      // this.secondsSinceEpoch = Math.round(Date.now() / 1000)
      //     console.log('Logged in time now : ' + this.secondsSinceEpoch);
      //     this.cookieService.set('okta_loggedin_time', this.secondsSinceEpoch);
    }
    
  

}
