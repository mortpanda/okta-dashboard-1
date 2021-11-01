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
  selector: 'app-mfafactors',
  templateUrl: './mfafactors.component.html',
  styleUrls: ['./mfafactors.component.css']
})
export class MfafactorsComponent implements OnInit {
  //strAccessToken;
  //strAllUsersFilter = '/api/v1/users'
  strURL;
  strData;

  strMFAArraySize;

  //Factor status
  countMFANot_Setup;
  countMFAPENDING_ACTIVATION;
  countMFAENROLLED;
  countMFAActive;
  countMFAINACTIVE;
  countMFAEXPIRED;
  arrMFATypeJSON: any = {};

  //// Active User Chart Options
  public pieChartColor2: any[] = [
    {
      backgroundColor: ["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629"]
    }
  ];

  public pieChartOptions2: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },
    maintainAspectRatio: true,
    
  };
  public pieChartLabels2: Label[] = ['Active', 'Enrolled', 'Pending Activation', 'Not Setup','Expired','Inactive'];
  public pieChartType2: ChartType = 'pie';
  public pieChartLegend2 = true;
  public pieChartPlugins2 = [];
  public pieChartData2: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0,0], label: 'Authentication Provider' }
  ];

  // @ViewChild(BaseChartDirective)
  // public chart: BaseChartDirective;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

  async ngOnInit() {
    //await this.DataloadComponent.ngOnInit();
    this.countMFANot_Setup = 0;
    this.countMFAPENDING_ACTIVATION = 0;
    this.countMFAENROLLED = 0;
    this.countMFAActive = 0;
    this.countMFAINACTIVE = 0;
    this.countMFAEXPIRED = 0;
    var strArrayMFATypes = localStorage.getItem('okta_mfas');
    this.arrMFATypeJSON = JSON.parse(strArrayMFATypes);
    console.log(this.arrMFATypeJSON);

    for (var i = 0; i < this.arrMFATypeJSON.length; i++) {
      switch (this.arrMFATypeJSON[i].status) {
        case "NOT_SETUP":
          this.countMFANot_Setup = Number(this.countMFANot_Setup) + 1
          break;
        case "PENDING_ACTIVATION":
          this.countMFAPENDING_ACTIVATION = Number(this.countMFAPENDING_ACTIVATION) + 1
          break;
        case "ENROLLED":
          this.countMFAENROLLED = Number(this.countMFAENROLLED) + 1
          break;
        case "ACTIVE":
          this.countMFAActive = Number(this.countMFAActive) + 1
          break;
         case "INACTIVE":
           this.countMFAINACTIVE = Number(this.countMFAINACTIVE) + 1
           break;
           case "EXPIRED":
          this.countMFAEXPIRED = Number(this.countMFAEXPIRED) + 1
          break;
      }
    }
    console.log('MFA Active : ' + this.countMFAActive);
    console.log('MFA Enrolled : ' + this.countMFAENROLLED);
    console.log('MDA Pending Activation : ' + this.countMFAPENDING_ACTIVATION);
    console.log('Not Setup : ' + this.countMFANot_Setup);
    console.log('Expired : ' + this.countMFAEXPIRED);
    console.log('Inactive : ' + this.countMFAINACTIVE);
    console.log('Filling chart with data');
    this.pieChartData2[0].data[0] = this.countMFAActive;
    this.pieChartData2[0].data[1] = this.countMFAENROLLED;
    this.pieChartData2[0].data[2] = this.countMFAPENDING_ACTIVATION;
    this.pieChartData2[0].data[3] = this.countMFANot_Setup;
    this.pieChartData2[0].data[4] = this.countMFAPENDING_ACTIVATION;
    this.pieChartData2[0].data[5] = this.countMFAEXPIRED;
    this.pieChartData2[0].data[5] = this.countMFAINACTIVE;
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