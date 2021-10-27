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
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-appstatus',
  templateUrl: './appstatus.component.html',
  styleUrls: ['./appstatus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppstatusComponent implements OnInit {

  strAccessToken;
  strURL;
  arrAppsJson: any = {};
  // intAppArrayLength;


  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  async GetApps() {
    
    this._snackBar.open('Data Download in Progress');
    localStorage.removeItem('okta_apps');
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    console.log(this.strAccessToken);
    const UpdateAppsCharts = async () => {
      const strResult = await this.FunctionGetApps(this.OktaConfig.strBaseURI + this.OktaConfig.strAllApps, this.strAccessToken)
    }
    await UpdateAppsCharts();
    this._snackBar.dismiss();

  }

  async FunctionGetApps(strUserCountURL, myToken) {
    // ELEMENT_DATA = [];
    // this.dataSource.data = ELEMENT_DATA;

    //localStorage.removeItem('okta_groups');
    var strUserType;
    console.log('Calling... : ' + strUserCountURL);
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
    await fetchRequest(strUserCountURL).then(data => {
      var aggregateAppData = [];
      // this.intAppArrayLength = 0;
      // this.countOktaGroup = 0;
      // this.countWindows = 0;
      aggregateAppData = aggregateAppData.concat(data)
       for (var i = 0; i < aggregateAppData.length; i++) {
        // this.intAppArrayLength = Number(this.intAppArrayLength) + 1;
        
        // this.arrAppsJson[i] = {
        //   id: aggregateAppData[i].id,
        //   label: aggregateAppData[i].label,
        //   status: aggregateAppData[i].status,
        //   //user: aggregatedData[i]._links.users,
        //   features: aggregateAppData[i].features,
        //   //assignedAppsCount: aggregateAppData[i]._embedded.stats.appsCount,
        //   //adminGroup: aggregateAppData[i]._embedded.stats.hasAdminPrivilege,
        //   //groupPush: aggregateAppData[i]._embedded.stats.groupPushMappingsCount,
        // };

        //this.arrGroupJson.push({id: + aggregatedData[i].id});
        // switch (aggregatedData[i].objectClass[0].toLowerCase()) {
        //   case "okta:windows_security_principal":
        //     this.countWindows = Number(this.countWindows) + 1
        //     break;
        //   case "okta:user_group":
        //     this.countOktaGroup = Number(this.countOktaGroup) + 1
        //     break;
        }
        console.log(aggregateAppData);
        this.arrAppsJson = aggregateAppData;
      }
    )
      // console.log('Okta Groups : ' + this.countOktaGroup);
      // console.log('Windows Groups : ' + this.countWindows);
      
    // }
    // );
    
    // Output from the get group function
    //this.arrAppsJson.length = Number(this.intAppArrayLength);
    // console.log(this.arrGroupJson);
    // Convert groups into string to prepare for localstorate
    const oktaApps = JSON.stringify(this.arrAppsJson);
    //Save to local storate
    localStorage.setItem('okta_apps', oktaApps);
    await fetchRequest(strUserCountURL);
    
    // this.FunctionFillTable();

  }


  // FunctionFillTable() {
  //   console.log('Starting filling in the table using the information on the local storage');
  //   this.GroupList = JSON.parse(localStorage.getItem('okta_groups'));
  //   console.log(this.GroupList);
  //   for (var i = 0; i < this.GroupList.length; i++) {
  //     //Rename group type to more readable form
  //     var groupType = "";
  //     switch (this.GroupList[i].objectClass.toLowerCase()) {
  //       case "okta:user_group":
  //         groupType = "Okta group"
  //         break;

  //       case "okta:windows_security_principal":
  //         groupType = "AD group"
  //         break;
  //       default:
  //         groupType = "Others"
  //         break;

  //     }
  //     ELEMENT_DATA[i] = {
  //       Name: this.GroupList[i].name,
  //       Admin: this.GroupList[i].adminGroup,
  //       Members: this.GroupList[i].memberCount,
  //       Apps: this.GroupList[i].assignedAppsCount,
  //       Pushgroups: this.GroupList[i].groupPush,
  //       Type: groupType,

  //     }
  //   }
  //   this.dataSource.data = ELEMENT_DATA;
  // }

}


