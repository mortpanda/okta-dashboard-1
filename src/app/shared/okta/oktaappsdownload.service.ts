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
export class OktaappsdownloadService {

  strAccessToken;
  strURL;
  arrAppsJson: any = {};
  intArrayAppsSize;
  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

  ngOnInit(): void {

  }
  async GetApps() {

    //this._snackBar.open('Data Download in Progress');
    localStorage.removeItem('okta_apps');
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    console.log(this.strAccessToken);
    const UpdateApps = async () => {
      const strResult = await this.FunctionGetApps(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strAllApps, this.strAccessToken)
    }
    await UpdateApps();
    // this._snackBar.dismiss();
    // this._snackBar.open('Data download completed', 'Close');

  }

  async FunctionGetApps(strAppsURL, myToken) {
    localStorage.removeItem('okta_apps')
    console.log('Calling... : ' + strAppsURL);
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
    await fetchRequest(strAppsURL).then(data => {
      var aggregateAppData = [];
      this.intArrayAppsSize = 0;
      aggregateAppData = aggregateAppData.concat(data)
      for (var i = 0; i < aggregateAppData.length; i++) {
        this.intArrayAppsSize = Number(this.intArrayAppsSize) + 1

      }
      console.log(aggregateAppData);
      this.arrAppsJson = aggregateAppData;
    }
    )
    // Output from the get group function
    this.arrAppsJson.length = this.intArrayAppsSize;
    //console.log(this.arrUserJson);
    const oktaApps = JSON.stringify(this.arrAppsJson);
    //Save to local storate
    localStorage.setItem('okta_apps', oktaApps);
    await fetchRequest(strAppsURL);
  }

}


