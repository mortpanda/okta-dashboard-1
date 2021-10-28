import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { CookieService } from 'ngx-cookie-service';
import { OktaApiEndpoints } from 'app/shared/okta/okta-api-endpoints'

// Needs to be the below versions
//npm install ng2-charts@2.3.0 --save
// npm i chart.js@2.9.0
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { Color } from 'ng2-charts';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admingroups',
  templateUrl: './admingroups.component.html',
  styleUrls: ['./admingroups.component.css']
})
export class AdmingroupsComponent implements OnInit {

  strAccessToken;
  strURL;
  // strData;
  // countAdminGroup;
  // countNONEAdminGroup
  // strUserArraySize;
  // arrGroupJson: any = {};

  countAdminGroup;
  countNONEAdminGroup;
  strUserArraySize;
  arrAdminGroupJson: any = {};

  // //// Active User Chart Options
  public barChartColor4: any[] = [
    {
      //backgroundColor: ["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629"]
      backgroundColor: ["#CC8A00", "#095661"]
    }
  ];
  public barChartOptions4: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },
    maintainAspectRatio: true,
    
  };
  public barChartLabels4: Label[] = ['Admin=True', 'Admin=False'];
  public barChartType4: ChartType = 'pie';
  public barChartLegend4 = true;
  public barChartPlugins4 = [];
  public barChartData4: ChartDataSets[] = [
    { data: [0, 0], label: 'Groups' }
  ];

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

  async ngOnInit() {
    this.countAdminGroup = 0;
    this.countNONEAdminGroup = 0;

    var strArrayAdminGroups = localStorage.getItem('okta_groups');
    this.arrAdminGroupJson = JSON.parse(strArrayAdminGroups);
    console.log(this.arrAdminGroupJson);
    for (var i = 0; i < this.arrAdminGroupJson.length; i++) {
      switch (this.arrAdminGroupJson[i]._embedded.stats.hasAdminPrivilege) {
        case true:
          this.countAdminGroup = Number(this.countAdminGroup) + 1
          break;
        case false:
          this.countNONEAdminGroup = Number(this.countNONEAdminGroup) + 1
          break;
      }
    }
    console.log('Admin Groups : ' + this.countAdminGroup);
    console.log('non-Admin Users : ' + this.countNONEAdminGroup);

    console.log('Filling chart with data');
    this.barChartData4[0].data[0] = this.countAdminGroup;
    this.barChartData4[0].data[1] = this.countNONEAdminGroup;
    

  }
}

  




// async GetAdminGroups() {
  //   this._snackBar.open('Data Download in Progress');
  //   this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
  //   console.log(this.strAccessToken);
  //   const UpdateAllGroupsCharts = async () => {
  //     const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strAllGroupsFilter, this.strAccessToken)
  //   }
  //   await UpdateAllGroupsCharts();
  //   this.updateChart();
  //   this._snackBar.dismiss();

  // }

  // async FunctionGetUserCount(strUserCountURL, myToken) {

  //   //this.numActiveUsers = '';
  //   var strUserType;
  //   console.log('Calling... : ' + strUserCountURL);
  //   /////////////////////////////////////
  //   /////////////////////////////////////
  //   async function fetchRequest(url) {
  //     try {
  //       // Fetch request and parse as JSON
  //       const response = await fetch(url, {
  //         headers: new Headers({
  //           'Authorization': 'Bearer ' + myToken,
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         })
  //       });
  //       let data = await response.json();
  //       // Extract the url of the response's "next" relational Link header
  //       let next_page;
  //       if (/<([^>]+)>; rel="next"/g.test(response.headers.get("link"))) {
  //         next_page = /<([^>]+)>; rel="next"/g.exec(response.headers.get("link"))[1];
  //       }
  //       // If another page exists, merge its output into the array recursively
  //       if (next_page) {
  //         data = data.concat(await fetchRequest(next_page));
  //       }
  //       return data;
  //     } catch (err) {
  //       return console.error(err);
  //     }
  //   }
  //   /////////////////////////////////////
  //   // Work on the data
  //   /////////////////////////////////////
  //   await fetchRequest(strUserCountURL).then(data => {
  //     var aggregatedAdminGroupData = [];

  //     this.countAdminGroup = 0;
  //     this.countNONEAdminGroup = 0;
  //     aggregatedAdminGroupData = aggregatedAdminGroupData.concat(data)
  //     for (var i = 0; i < aggregatedAdminGroupData.length; i++) {
  //       this.arrGroupJson[i] = {
  //         id: aggregatedAdminGroupData[i].id,
  //         name: aggregatedAdminGroupData[i].profile.name,
  //         objectClass: aggregatedAdminGroupData[i].objectClass[0],
  //         user: aggregatedAdminGroupData[i]._links.users
  //       };
  //       switch (aggregatedAdminGroupData[i]._embedded.stats.hasAdminPrivilege) {
  //         case true:
  //           this.countAdminGroup = Number(this.countAdminGroup) + 1
  //           break;
  //         case false:
  //           this.countNONEAdminGroup = Number(this.countNONEAdminGroup) + 1
  //           break;
  //       }
  //     }
  //     console.log('Groups with Admin : ' + this.countAdminGroup);
  //     console.log('Groups WITHOUT Admin : ' + this.countNONEAdminGroup);
  //     console.log(aggregatedAdminGroupData);
  //     this.strUserArraySize = data.length;
  //   }
  //   );
  //   this.barChartData4[0].data[0] = Number(this.countAdminGroup);
  //   this.barChartData4[0].data[1] = Number(this.countNONEAdminGroup);
  //   // Output from the get group function
  //   console.log(this.arrGroupJson);
  //   await fetchRequest(strUserCountURL);

  // }