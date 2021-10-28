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
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsertypeComponent implements OnInit {
  //strAccessToken;
  //strAllUsersFilter = '/api/v1/users'
  strURL;
  strData;

  strUserArraySize;

  //User Type
  countAD;
  countOkta;
  countLDAP;
  countSocial;
  countImport;
  countOthers;
  arrUserTypeJSON: any = {};

  //// Active User Chart Options
  public pieChartColor: any[] = [
    {
      backgroundColor: ["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629"]
    }
  ];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },
    maintainAspectRatio: true
  };
  public pieChartLabels: Label[] = ['Okta Users', 'AD Users', 'LDAP Users', 'Others'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0], label: 'Authentication Provider' }
  ];

  // @ViewChild(BaseChartDirective)
  // public chart: BaseChartDirective;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

  async ngOnInit() {
    //await this.DataloadComponent.ngOnInit();
    this.countAD = 0;
    this.countOkta = 0;
    this.countLDAP = 0;
    this.countSocial = 0;
    this.countImport = 0;
    this.countOthers = 0;
    var strArrayUserTypes = localStorage.getItem('okta_users');
    this.arrUserTypeJSON = JSON.parse(strArrayUserTypes);
    console.log(this.arrUserTypeJSON);
    
    for (var i = 0; i < this.arrUserTypeJSON.length; i++) {
      switch (this.arrUserTypeJSON[i].credentials.provider.type) {
        case "ACTIVE_DIRECTORY":
          this.countAD = Number(this.countAD) + 1
          break;
        case "OKTA":
          this.countOkta = Number(this.countOkta) + 1
          break;
        case "LDAP":
          this.countLDAP = Number(this.countLDAP) + 1
          break;
        case "SOCIAL":
          this.countSocial = Number(this.countSocial) + 1
          break;
        // case "IMPORT":
        //   this.countImport = Number(this.countImport) + 1
        //   break;
        default:
          this.countOthers = Number(this.countOthers) + 1
          break;
      }
    }
    console.log('Okta Users : ' + this.countAD);
    console.log('LDAP Users : ' + this.countOkta);
    console.log('Social login Users : ' + this.countLDAP);
    console.log('Imported Users Users : ' + this.countSocial);
    console.log('AD Users : ' + this.countImport);
    console.log('Others Users : ' + this.countOthers);
    console.log('Filling chart with data');
    this.pieChartData[0].data[0] = this.countOkta;
    this.pieChartData[0].data[1] = this.countAD;
    this.pieChartData[0].data[2] = this.countLDAP;
    this.pieChartData[0].data[3] = this.countOthers;
    
  }

}

// async ngOnInit() {
// }

// async GetUserTypes() {

//   this._snackBar.open('Data Download in Progress');
//   // console.log(this.OktaConfig.strStagedUsersFilter);
//   // this.strURL = this.OktaConfig.strBaseURI + this.OktaConfig.strRecoveryUserFilter;
//   this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
//   console.log(this.strAccessToken);
//   const UpdateAllUsersCharts = async () => {
//     const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strAllUsersFilter, this.strAccessToken)
//   }
//   await UpdateAllUsersCharts();
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
//   /////////////////////////////////////
//   await fetchRequest(strUserCountURL).then(data => {
//     var aggregatedUserData = [];
//     //var ADcount;
//     this.countAD = 0;
//     this.countOkta = 0;
//     this.countLDAP = 0;
//     // this.countSocial = 0;
//     // this.countImport = 0;
//     this.countOthers = 0;
//     aggregatedUserData = aggregatedUserData.concat(data)
//     for (var i = 0; i < aggregatedUserData.length; i++) {
//       //console.log(aggregatedData[i].credentials.provider.type)
//       var UserType;
//       UserType = aggregatedUserData[i].credentials.provider.type.toString();
//       //console.log(UserType);
//       switch (UserType) {
//         case "ACTIVE_DIRECTORY":
//           this.countAD = Number(this.countAD) + 1
//           break;
//         case "OKTA":
//           this.countOkta = Number(this.countOkta) + 1
//           break;
//         case "LDAP":
//           this.countLDAP = Number(this.countLDAP) + 1
//           break;
//         // case "SOCIAL":
//         //   this.countSocial = Number(this.countSocial) + 1
//         //   break;
//         // case "IMPORT":
//         //   this.countImport = Number(this.countImport) + 1
//         //   break;
//         default:
//           this.countOthers = Number(this.countOthers) + 1
//           break;
//       }
//     }
//     console.log('AD authenticated users : ' + this.countAD);
//     console.log('Okta authenticated users : ' + this.countOkta);
//     console.log('LDAP authenticated users : ' + this.countLDAP);
//     console.log('Others : ' + this.countOthers);
//     //console.log('Social users : ' + this.countSocial);
//     //console.log('Imported users : ' + this.countImport);
//     console.log(aggregatedUserData);
//     this.strUserArraySize = data.length;
//   }
//   );
//   this.pieChartData[0].data[0] = Number(this.countOkta);
//   this.pieChartData[0].data[1] = Number(this.countAD);
//   this.pieChartData[0].data[2] = Number(this.countLDAP);
//   // this.pieChartData[0].data[3] = Number(this.countSocial);
//   // this.pieChartData[0].data[4] = Number(this.countImport);

//   await fetchRequest(strUserCountURL);
//   //console.log(strUserType + this.strUserArraySize);
// }