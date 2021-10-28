import { Injectable } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { CookieService } from 'ngx-cookie-service';

// Needs to be the below versions
//npm install ng2-charts@2.3.0 --save
// npm i chart.js@2.9.0
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { Color } from 'ng2-charts';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaApiEndpoints } from 'app/shared/okta/okta-api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class OktagroupsdownloadService {

  strAccessToken;
  strURL;
  strData;
  // countOkta;
  // countWindows;
  intGroupArraySize;
  arrGroupJson: any = {};

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

  async ngOnInit() {

  }

  async GetGroups() {

    // this._snackBar.open('Data Download in Progress');
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    console.log(this.strAccessToken);
    const UpdateGroups = async () => {
      const strResult = await this.FunctionGetGroups(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strAllGroupsFilter, this.strAccessToken)
    }
    await UpdateGroups();

    // this._snackBar.dismiss();

  }

  async FunctionGetGroups(strGroupsURL, myToken) {
    localStorage.removeItem('okta_groups')

    //var strUserType;
    console.log('Calling... : ' + strGroupsURL);
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
    await fetchRequest(strGroupsURL).then(data => {
      var aggregatedData = [];
      this.intGroupArraySize = 0;
      aggregatedData = aggregatedData.concat(data)
      for (var i = 0; i < aggregatedData.length; i++) {
        this.intGroupArraySize = Number(this.intGroupArraySize) + 1      

      }
      console.log(aggregatedData);
      this.arrGroupJson = aggregatedData;
    }
    );
    // Output from the get group function
    this.arrGroupJson.length = this.intGroupArraySize;
    // Convert groups into string to prepare for localstorate
    const oktagroups = JSON.stringify(this.arrGroupJson);
    //Save to local storate
    localStorage.setItem('okta_groups',oktagroups);
    await fetchRequest(strGroupsURL);
    
  }

}
