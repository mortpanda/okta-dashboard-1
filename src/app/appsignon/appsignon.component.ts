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
import { DataloadComponent } from 'app/dataload/dataload.component';

@Component({
  selector: 'app-appsignon',
  templateUrl: './appsignon.component.html',
  styleUrls: ['./appsignon.component.css']
})
export class AppsignonComponent implements OnInit {

  // AUTO_LOGIN	Secure Web Authentication (SWA)
  intSWAuto;
  // BASIC_AUTH	HTTP Basic Authentication with Okta Browser Plugin
  intBasic;
  // BOOKMARK	Just a bookmark (no-authentication)
  inBookmark;
  // BROWSER_PLUGIN	Secure Web Authentication (SWA) with Okta Browser Plugin
  intSWAPlugin;
  // Custom	App-Specific SignOn Mode
  intCustom;
  // OPENID_CONNECT	Federated Authentication with OpenID Connect
  intOIDC;
  // SAML_1_1	Federated Authentication with SAML 1.1 WebSSO
  intSAML11;
  // SAML_2_0	Federated Authentication with SAML 2.0 WebSSO
  intSAML2;
  // SECURE_PASSWORD_STORE	Secure Web Authentication (SWA) with POST (plugin not required)
  inSWAPW;
  // WS_FEDERATION	Federated Authentication with WS-Federation Passive Requestor Profile
  intWSFED;

  arrAPPSingOnModeJSON: any = {};
  AppStatusFilter;

  //// Active User Chart Options
  public barChartColor6: any[] = [
    {
      backgroundColor: ["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629","#CFB1C1","#E97107","#FAAFA3","#A0DCC3","#FAD28C"]
    }
  ];
  public barChartOptions6: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
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
  public barChartLabels6: Label[] = ['SWA Auto login', 'Basic Auth', 'Bookmark', 'SWA Plugin', 'Custom', 'OIDC', 'Saml 1.1', 'SAML 2.0', 'SWA Password post', 'WS-FED'];
  public barChartType6: ChartType = 'bar';
  public barChartLegend6 = false;
  public barChartPlugins6 = [];
  public barChartData6: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Apps' }
  ];

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints, private DataloadComponent: DataloadComponent) { }

  async ngOnInit() {
    this.intSWAuto = 0;
    this.intBasic = 0;
    this.inBookmark = 0;
    this.intSWAPlugin = 0;
    this.intCustom = 0;
    this.intOIDC = 0;
    this.intSAML11 = 0;
    this.intSAML2 = 0;
    this.inSWAPW = 0;
    this.intWSFED = 0;
    var strArrayAppSSO = localStorage.getItem('okta_apps');
    this.arrAPPSingOnModeJSON = JSON.parse(strArrayAppSSO);
    this.AppStatusFilter;

    console.log(this.arrAPPSingOnModeJSON);
    console.log('User array length is : ' + this.arrAPPSingOnModeJSON.length);
    for (var i = 0; i < this.arrAPPSingOnModeJSON.length; i++) {

      //Only work on active applications
      switch (this.arrAPPSingOnModeJSON[i].status) {
        case "ACTIVE":
          //work on active apps
          switch (this.arrAPPSingOnModeJSON[i].signOnMode) {
            case "AUTO_LOGIN":
              this.intSWAuto = Number(this.intSWAuto) + 1;
              break;
            case "BASIC_AUTH":
              this.intBasic = Number(this.intBasic) + 1;
              break;
            case "BROWSER_PLUGIN":
              this.intSWAPlugin = Number(this.intSWAPlugin) + 1;
              break;
            case "Customr":
              this.intCustom = Number(this.intCustom) + 1;
              break;
            case "OPENID_CONNECT":
              this.intOIDC = Number(this.intOIDC) + 1;
              break;
            case "SAML_1_1":
              this.intSAML11 = Number(this.intSAML11) + 1;
              break;
            case "SAML_2_0":
              this.intSAML2 = Number(this.intSAML2) + 1;
              break;
            case "SECURE_PASSWORD_STORE":
              this.inSWAPW = Number(this.inSWAPW) + 1;
              break;
            case "WS_FEDERATION":
              this.intWSFED = Number(this.intWSFED) + 1;
          }
      }
    }
    console.log('SWA Auto login apps : ' + this.intSWAuto);
    console.log('Basic Auth apps : ' + this.intBasic);
    console.log('Bookmark apps : ' + this.inBookmark);
    console.log('SWA with Okta plugin : ' + this.intSWAPlugin);
    console.log('Customer auth apps : ' + this.intCustom);
    console.log('OIDC apps : ' + this.intOIDC);
    console.log('SAML 1.1 apps : ' + this.intSAML11);
    console.log('SAML 2.0 apps : ' + this.intSAML2);
    console.log('SWA with Post : ' + this.inSWAPW);
    console.log('WS-FED : ' + this.intWSFED);
    console.log('Filling chart with data');
    this.barChartData6[0].data[0] = this.intSWAuto;
    this.barChartData6[0].data[1] = this.intBasic;
    this.barChartData6[0].data[2] = this.inBookmark;
    this.barChartData6[0].data[3] = this.intSWAPlugin;
    this.barChartData6[0].data[4] = this.intCustom;
    this.barChartData6[0].data[5] = this.intOIDC;
    this.barChartData6[0].data[6] = this.intSAML11;
    this.barChartData6[0].data[7] = this.intSAML2;
    this.barChartData6[0].data[8] = this.inSWAPW;
    this.barChartData6[0].data[9] = this.intWSFED;
    // // this.updateChart()
  }
}

