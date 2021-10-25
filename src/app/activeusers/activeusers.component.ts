import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
//import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
import {ActivetotalComponent} from 'app/activetotal/activetotal.component';


@Component({
  selector: 'app-activeusers',
  templateUrl: './activeusers.component.html',
  styleUrls: ['./activeusers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActiveusersComponent implements OnInit {

  strAccessToken;
  strAllUsersFilter = '/api/v1/users'
  strURL;

  //Consumes License
  numActiveUsers;
  numRecoveryUsers;
  numPWExpiredUsers;
  numLockedOutUsers;
  numSuspendedUsers

  numTotalLicensedUsers;

  strUserArraySize;

  //// Active User Chart Options
  public barChartColor: any[] = [
    {
      backgroundColor:["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629"]
    }
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          stepSize: 1,
          beginAtZero: true
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['Active', 'Recovery', 'PW Expired', 'Locked out', 'Suspended'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'Users' }
  ];

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    ,private _snackBar: MatSnackBar, private ActivetotalComponent:ActivetotalComponent) { }

  updateChart() {
    //this.barChartData.push();
    this.chart.update();
    
}


  async ngOnInit() {

  }

  async GetUsers() {
    this.numTotalLicensedUsers='0';
    this._snackBar.open('Data Download in Progress');
    console.log(this.OktaConfig.strStagedUsersFilter);
    this.strURL = this.OktaConfig.strBaseURI + this.OktaConfig.strRecoveryUserFilter;
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    console.log(this.strAccessToken);
    this.strUserArraySize = '';
    this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strActiveUserFilter, this.strAccessToken);
    this.strUserArraySize = '';
    this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strProvisionedUsersFilter, this.strAccessToken);
    this.strUserArraySize = '';
    this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strRecoveryUserFilter, this.strAccessToken);
    this.strUserArraySize = '';
    this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strPWExpiredFilter, this.strAccessToken);
    this.strUserArraySize = '';
    this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strLockedOutFilter, this.strAccessToken);
    const UpdateActiveUserCharts = async () => {
      const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strActiveUserFilter, this.strAccessToken)
    }
    const UpdateProvisionedUserCharts = async () => {
      const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strProvisionedUsersFilter, this.strAccessToken)
    }
    const UpdateRecoveryUserCharts = async () => {
      const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strRecoveryUserFilter, this.strAccessToken)
    }
    const UpdatePWExpiredUserCharts = async () => {
      const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strPWExpiredFilter, this.strAccessToken)
    }
    const UpdateLockedOutUserCharts = async () => {
      const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strLockedOutFilter, this.strAccessToken)
    }
    const UpdateSuspendedUserCharts = async () => {
      const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strSuspendedFilter, this.strAccessToken)
    }

    await UpdateActiveUserCharts();
    await UpdateProvisionedUserCharts();
    await UpdateRecoveryUserCharts();
    await UpdatePWExpiredUserCharts();
    await UpdateLockedOutUserCharts();
    await UpdateSuspendedUserCharts();
    console.log('Start Filling the array')
    this.barChartData[0].data[0] = Number(this.cookieService.get('OktaActiveUsers'));
    this.barChartData[0].data[1] = Number(this.cookieService.get('OktaRecoveryUsers'));
    this.barChartData[0].data[2] = Number(this.cookieService.get('OktaPWExpiredUsers'));
    this.barChartData[0].data[3] = Number(this.cookieService.get('OktaLockedoutUsers'));
    this.barChartData[0].data[4] = Number(this.cookieService.get('OktaSuspendedUsers'));
    console.log('Update the chart with the below data')
    console.log(this.barChartData);
    //this.chart.chart.update();
    this.updateChart();
    this._snackBar.dismiss();
    this.ActivetotalComponent.GetActiveToalFromCookie();
  }


  async FunctionGetUserCount(strUserCountURL, myToken) {
    //this.numActiveUsers = '';
    var strUserType;
    console.log('Calling... : ' + strUserCountURL);
    /////////////////////////////////////
    // Set output test depending on the URL
    switch (strUserCountURL) {
      case this.OktaConfig.strBaseURI + this.OktaConfig.strProvisionedUsersFilter:
        strUserType = "Provisioned Users : "
        break;
      case this.OktaConfig.strBaseURI + this.OktaConfig.strActiveUserFilter:
        strUserType = "Active Users : "
        break;
      case this.OktaConfig.strBaseURI + this.OktaConfig.strRecoveryUserFilter:
        strUserType = "Recovery Users : "
        break;
      case this.OktaConfig.strBaseURI + this.OktaConfig.strPWExpiredFilter:
        strUserType = "Password Expired Users : "
        break;
      case this.OktaConfig.strBaseURI + this.OktaConfig.strLockedOutFilter:
        strUserType = "Locked Out Users : "
        break;
      case this.OktaConfig.strBaseURI + this.OktaConfig.strSuspendedFilter:
        strUserType = "Suspended Users : "
        break;

    }
    //myToken = this.strAccessToken;
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

    /////////////////////////////////////
    await fetchRequest(strUserCountURL).then(data =>
      this.strUserArraySize = data.length
    );
    /////////////////////////////////////

    /////////////////////////////////////
    // Fill data in array depending on the URL
    switch (strUserCountURL) {
      case this.OktaConfig.strBaseURI + this.OktaConfig.strProvisionedUsersFilter:
        strUserType = "Provisioned Users : "
        this.cookieService.set('OktaProvisionedUsers', this.strUserArraySize);
        // this.numTotalLicensedUsers = Number(this.numTotalLicensedUsers) + Number(this.strUserArraySize);
        // this.cookieService.set('OktaTotalActiveUsers', this.numTotalLicensedUsers);
        break;
      case this.OktaConfig.strBaseURI + this.OktaConfig.strActiveUserFilter:

        strUserType = "Active Users : "
        this.cookieService.set('OktaActiveUsers', this.strUserArraySize);
        this.numTotalLicensedUsers = Number(this.numTotalLicensedUsers) + Number(this.strUserArraySize);
        this.cookieService.set('OktaTotalActiveUsers', this.numTotalLicensedUsers);
        break;

      case this.OktaConfig.strBaseURI + this.OktaConfig.strRecoveryUserFilter:

        strUserType = "Users in Recovery state : "
        this.cookieService.set('OktaRecoveryUsers', this.strUserArraySize);
        this.numTotalLicensedUsers = Number(this.numTotalLicensedUsers) + Number(this.strUserArraySize);
        this.cookieService.set('OktaTotalActiveUsers', this.numTotalLicensedUsers);
        break;
      case this.OktaConfig.strBaseURI + this.OktaConfig.strPWExpiredFilter:

        strUserType = "Password Expired Users : "
        this.cookieService.set('OktaPWExpiredUsers', this.strUserArraySize);
        this.numTotalLicensedUsers = Number(this.numTotalLicensedUsers) + Number(this.strUserArraySize);
        this.cookieService.set('OktaTotalActiveUsers', this.numTotalLicensedUsers);
        break;
      case this.OktaConfig.strBaseURI + this.OktaConfig.strLockedOutFilter:

        strUserType = "Locked out Users : "
        this.cookieService.set('OktaLockedoutUsers', this.strUserArraySize);
        this.numTotalLicensedUsers = Number(this.numTotalLicensedUsers) + Number(this.strUserArraySize);
        this.cookieService.set('OktaTotalActiveUsers', this.numTotalLicensedUsers);
        break;

      case this.OktaConfig.strBaseURI + this.OktaConfig.strSuspendedFilter:

        strUserType = "Suspended Users : "
        this.cookieService.set('OktaSuspendedUsers', this.strUserArraySize);
        this.numTotalLicensedUsers = Number(this.numTotalLicensedUsers) + Number(this.strUserArraySize);
        this.cookieService.set('OktaTotalActiveUsers', this.numTotalLicensedUsers);
        break;
    }
    await fetchRequest(strUserCountURL);
    console.log(strUserType + this.strUserArraySize);
  }
}