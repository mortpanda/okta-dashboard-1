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
import { DataloadComponent} from 'app/dataload/dataload.component';


@Component({
  selector: 'app-inactiveusers',
  templateUrl: './inactiveusers.component.html',
  styleUrls: ['./inactiveusers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InactiveusersComponent implements OnInit {
  strAccessToken;
  strURL;

  //Doesn't Consumes License
  StatusUsers;
  arrInactiveUserJSON: any = {};
  intStaged;
  intProvisioned;
  intDeprovisioned;
  


  //// Active User Chart Options
  public barChartColor2: any[] = [
    {
      backgroundColor:["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629"]
    }
  ];
  public barChartOptions2: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          stepSize: 1,
          beginAtZero: true
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          // stepSize: 1,
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels2: Label[] = ['Staged', 'Provisioned','Deprovisioned'];
  public barChartType2: ChartType = 'bar';
  public barChartLegend2 = false;
  public barChartPlugins2 = [];
  public barChartData2: ChartDataSets[] = [
    { data: [0, 0], label: 'Users' }
  ];

  @ViewChild(BaseChartDirective)
  public chart2: BaseChartDirective;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService,
    private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

//   updateChart() {
//     //this.chart2.chart.update(); // This re-renders the canvas element.
//     //this.barChartData2.push();
//     this.chart2.chart.update();
// }

async ngOnInit() {
  //await this.DataloadComponent.ngOnInit();
  this.intStaged = 0;
  this.intProvisioned = 0;
  this.intDeprovisioned = 0;
  
  var strArrayInactiveUsers = localStorage.getItem('okta_users');
  this.arrInactiveUserJSON  = JSON.parse(strArrayInactiveUsers);
//  console.log(this.arrInactiveUserJSON );
  console.log('User array length is : ' + this.arrInactiveUserJSON.length);
  for (var i = 0; i < this.arrInactiveUserJSON.length; i++) {
    switch (this.arrInactiveUserJSON[i].status) {
      case "STAGED":
        this.intStaged = Number(this.intStaged) + 1;
        break;
      case "PROVISIONED":
        this.intProvisioned = Number(this.intProvisioned) + 1;
        break;
      case "DEPROVISIONED":
        this.intDeprovisioned = Number(this.intDeprovisioned) + 1;
        break;
      
    }
  }
  console.log('STAGED Users : ' + this.intStaged);
  console.log('PROVISIONED Users : ' + this.intProvisioned);
  console.log('DEPROVISIONED Users : ' + this.intDeprovisioned);
  
  console.log('Filling chart with data');
  this.barChartData2[0].data[0] = this.intStaged;
  this.barChartData2[0].data[1] = this.intProvisioned;
  this.barChartData2[0].data[2] = this.intDeprovisioned;
  
  // this.updateChart()
}


}

// async ngOnInit() {

// }

// async GetInactiveUsers() {
//   this._snackBar.open('Data Download in Progress');
//   //console.log(this.OktaApiEndpoints.strStagedUsersFilter);
//   this.strURL = this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strRecoveryUserFilter;
//   this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
//   console.log(this.strAccessToken);
//   this.strUserArraySize = '';
//   this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strStagedUsersFilter, this.strAccessToken);
//   this.strUserArraySize = '';
//   this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strProvisionedUsersFilter, this.strAccessToken);
//   this.strUserArraySize = '';
//   this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strDeprovisionedFilter, this.strAccessToken);

//   const UpdateDeprovisionedUserCharts = async () => {
//     const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strDeprovisionedFilter, this.strAccessToken)
//   }
//   const UpdateProvisionedUserCharts = async () => {
//     const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strProvisionedUsersFilter, this.strAccessToken)
//   }
//   const UpdateStagedUserCharts = async () => {
//     const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strStagedUsersFilter, this.strAccessToken)
//   }
//   await UpdateDeprovisionedUserCharts();
//   await UpdateStagedUserCharts();
//   await UpdateProvisionedUserCharts();

//   console.log('Start Filling the array')
//   this.barChartData2[0].data[0] = Number(this.cookieService.get('OktaStagedUsers'));
//   this.barChartData2[0].data[1] = Number(this.cookieService.get('OktaProvisionedUsers'));
//   this.barChartData2[0].data[2] = Number(this.cookieService.get('OktaDeprovisionedUsers'));
//   console.log('Update the chart with the below data')
//   console.log(this.barChartData2);
//   //this.chart2.chart.update();
//   this.updateChart();
//   this._snackBar.dismiss();
// }


// async FunctionGetUserCount(strUserCountURL, myToken) {
//   //this.numActiveUsers = '';
//   var strUserType;
//   console.log('Calling... : ' + strUserCountURL);
//   /////////////////////////////////////
//   // Set output test depending on the URL
//   switch (strUserCountURL) {
//     case this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strProvisionedUsersFilter:
//       strUserType = "Provisioned Users : "
//       break;
//     case this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strStagedUsersFilter:
//       strUserType = "Staged Users : "
//       break;
//     case this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strDeprovisionedFilter:
//       strUserType = "Deprovisioned Users : "
//       break;
//   }
//   myToken = this.strAccessToken;
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

//   /////////////////////////////////////
//   await fetchRequest(strUserCountURL).then(data =>
//     this.strUserArraySize = data.length
//   );
//   /////////////////////////////////////

//   /////////////////////////////////////
//   // Fill data in array depending on the URL
//   switch (strUserCountURL) {
//     case this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strProvisionedUsersFilter:
//       strUserType = "Provisioned Users : "
//       this.cookieService.set('OktaProvisionedUsers', this.strUserArraySize);
//       break;

//     case this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strStagedUsersFilter:

//       strUserType = "Staged Users : "
//       this.cookieService.set('OktaStagedUsers', this.strUserArraySize);
//       break;

//     case this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strDeprovisionedFilter:

//       strUserType = "Deprovisioned Users : "
//       this.cookieService.set('OktaDeprovisionedUsers', this.strUserArraySize);
//       break;

//   }
//   await fetchRequest(strUserCountURL);
//   console.log(strUserType + this.strUserArraySize);

// }