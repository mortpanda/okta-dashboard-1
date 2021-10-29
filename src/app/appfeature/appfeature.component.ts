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
import { OktaApiEndpoints } from 'app/shared/okta/okta-api-endpoints'


@Component({
  selector: 'app-appfeature',
  templateUrl: './appfeature.component.html',
  styleUrls: ['./appfeature.component.css']
})
export class AppfeatureComponent implements OnInit {
  strAccessToken;
  strURL;
  arrAppFeatureJSON: any = {};
  arrSingleAppFeatures: any = {};

  intGroupPush;
  inUserImport;
  intProfileMaster;
  intCreateUser;
  intSyncPW;
  intUpdateUser;
  intDeactivateUser;
  intOthers;

  //// Active User Chart Options
  public barChartColor7: any[] = [
    {
      backgroundColor: ["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629", "#CFB1C1", "#E97107", "#FAAFA3", "#A0DCC3", "#FAD28C"]
    }
  ];
  public barChartOptions7: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [{
        ticks: {
          min: 0,
          // stepSize: 1,
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
  public barChartLabels7: Label[] = ['Group push', 'User import', 'Profile master', 'Create users', 'Sync Okta pw', 'Update user', 'Deactivate user'];
  public barChartType7: ChartType = 'bar';
  public barChartLegend7 = false;
  public barChartPlugins7 = [];
  public barChartData7: ChartDataSets[] = [
    { data: [0, 0], label: 'Apps' }
  ];

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }


  async ngOnInit() {

    this.intGroupPush = 0;
    this.inUserImport = 0;
    this.intProfileMaster = 0;
    this.intCreateUser = 0;
    this.intSyncPW = 0;
    this.intUpdateUser = 0;
    this.intDeactivateUser = 0;
    this.intOthers = 0;

    var strArrayAppsFeatures = localStorage.getItem('okta_apps');
    this.arrAppFeatureJSON = JSON.parse(strArrayAppsFeatures);
    //console.log(this.arrAppFeatureJSON);
    console.log('App array length is : ' + this.arrAppFeatureJSON.length);
    for (var i = 0; i < this.arrAppFeatureJSON.length; i++) {

      switch (this.arrAppFeatureJSON[i].status) {
        case "ACTIVE":
      //Need to cycle through feature and increment
      for (var f = 0; f < this.arrAppFeatureJSON[i].features.length; f++) {
        for (var it = 0; it < this.arrAppFeatureJSON[i].features.length; it++) {
          switch (this.arrAppFeatureJSON[i].features[it]) {
            // https://developer.okta.com/docs/reference/api/apps/#features
            //  Group Push - GROUP_PUSH
            //	User Import - IMPORT_NEW_USERS
            //	User Import - IMPORT_PROFILE_UPDATES
            //  Other - IMPORT_USER_SCHEMA
            //  Profile Master - PROFILE_MASTERING
            //  Create Users - PUSH_NEW_USERS          
            //  Sync Okta Password - PUSH_PASSWORD_UPDATES
            //  Update User Properties - PUSH_PROFILE_UPDATES
            //  Deactivate Users - PUSH_USER_DEACTIVATION
            //  Deactivate Users - REACTIVATE_USERS
            case "GROUP_PUSH":
              this.intGroupPush = Number(this.intGroupPush) + 1;
              break;
            case "IMPORT_NEW_USERS":
              this.inUserImport = Number(this.inUserImport) + 1;
              break;
            case "IMPORT_PROFILE_UPDATES":
              this.inUserImport = Number(this.inUserImport) + 1;
              break;
            case "IMPORT_USER_SCHEMA":
              this.intOthers = Number(this.intOthers) + 1;
              break;
            case "PROFILE_MASTERING":
              this.intProfileMaster = Number(this.intProfileMaster) + 1;
              break;
            case "PUSH_NEW_USERS":
              this.intCreateUser = Number(this.intCreateUser) + 1;
              break;
            case "PUSH_PASSWORD_UPDATES":
              this.intSyncPW = Number(this.intSyncPW) + 1;
              break;
            case "PUSH_PROFILE_UPDATES":
              this.intUpdateUser = Number(this.intUpdateUser) + 1;
              break;
            case "PUSH_USER_DEACTIVATION":
              this.intDeactivateUser = Number(this.intDeactivateUser) + 1;
              break;
            case "REACTIVATE_USERS":
              this.intDeactivateUser = Number(this.intDeactivateUser) + 1;
              break;
            default:
              this.intOthers = Number(this.intOthers) + 1;
              break;
          }
        }
      }
          break;
        case "INACTIVE":

          break;
      }
    }
    console.log('Group push enabled apps : ' + this.intGroupPush);
    console.log('User import enabled apps : ' + this.inUserImport);
    console.log('Apps set as profile master : ' + this.intProfileMaster);
    console.log('Apps which can create users in the downstream app : ' + this.intCreateUser);
    console.log('Apps which can synch password : ' + this.intSyncPW);
    console.log('Update the user propfile in the app : ' + this.intUpdateUser);
    console.log('Users can be deactivated in the app : ' + this.intDeactivateUser);
    console.log('Apps with other features : ' + this.intOthers);

   
    this.barChartData7[0].data[0] = this.intGroupPush;
    this.barChartData7[0].data[1] = this.inUserImport;
    this.barChartData7[0].data[2] = this.intProfileMaster;
    this.barChartData7[0].data[3] = this.intCreateUser;
    this.barChartData7[0].data[4] = this.intSyncPW;
    this.barChartData7[0].data[5] = this.intUpdateUser;
    this.barChartData7[0].data[6] = this.intDeactivateUser;
    this.barChartData7[0].data[7] = this.intOthers;
    
  }
}
