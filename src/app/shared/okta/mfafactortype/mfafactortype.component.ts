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
  selector: 'app-mfafactortype',
  templateUrl: './mfafactortype.component.html',
  styleUrls: ['./mfafactortype.component.css']
})
export class MfafactortypeComponent implements OnInit {
  //strAccessToken;
  //strAllUsersFilter = '/api/v1/users'
  strURL;
  strData;

  strMFATypeArraySize;

  //Factor Types
  countCallType;
  countEmail;
  countPush;
  countQ;
  countSMS;
  countHWToken;
  countHOTP;
  countSOTP;
  countToken;
  countU2F;
  countWeb;
  countWebAuthn

  arrFactorTypeJSON: any = {};

  //// Active User Chart Options
  public MFATypeColor: any[] = [
    {
      backgroundColor: ["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629", "#CFB1C1", "#E97107", "#FAAFA3", "#A0DCC3", "#FAD28C"]
    }
  ];

  public MFATypeOptions: ChartOptions = {
    responsive: true,
    legend: { position: 'bottom' },
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
          stepSize: 1,
          beginAtZero: true
        }
      }]
    }

  };
  public MFATypeLabel: Label[] = ['Call', 'Email', 'Push', 'Question', 'SMS', 'HW Token', 'HW OTP', 'Software OTP', 'Token', 'U2F', 'Web', 'WebAuthn'];
  public MFATypeChart: ChartType = 'bar';
  public MFATypeLegend = false;
  public MFATypePlugin = [];
  public MFATypeData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0], label: 'Factor Type' }
  ];

  // @ViewChild(BaseChartDirective)
  // public chart: BaseChartDirective;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

  async ngOnInit() {
    //await this.DataloadComponent.ngOnInit();
    this.countCallType = 0;
    this.countEmail = 0;
    this.countPush = 0;
    this.countQ = 0;
    this.countSMS = 0;
    this.countHWToken
    this.countHOTP = 0;
    this.countSOTP = 0;
    this.countToken = 0;
    this.countU2F = 0;
    this.countWeb = 0;
    this.countWebAuthn = 0;
    var strArrayFactorTypes = localStorage.getItem('okta_mfas');
    this.arrFactorTypeJSON = JSON.parse(strArrayFactorTypes);
    console.log(this.arrFactorTypeJSON);



    for (var i = 0; i < this.arrFactorTypeJSON.length; i++) {

      switch (this.arrFactorTypeJSON[i].status) {
        case "ACTIVE":

          switch (this.arrFactorTypeJSON[i].factorType) {
            case "call":
              this.countCallType = Number(this.countCallType) + 1
              break;
            case "email":
              this.countEmail = Number(this.countEmail) + 1
              break;
            case "push":
              this.countPush = Number(this.countPush) + 1
              break;
            case "question":
              this.countQ = Number(this.countQ) + 1
              break;
            case "sms":
              this.countSMS = Number(this.countSMS) + 1
              break;
            case "token:hardware":
              this.countHWToken = Number(this.countHWToken) + 1
              break;
            case "token:hotp":
              this.countHOTP = Number(this.countHOTP) + 1
              break;
            case "token:software:totp":
              this.countSOTP = Number(this.countSOTP) + 1
              break;
            case "token":
              this.countToken = Number(this.countToken) + 1
              break;
            case "u2f":
              this.countU2F = Number(this.countWeb) + 1
              break;
            case "web":
              this.countWeb = Number(this.countWeb) + 1
              break;
            case "webauthn":
              this.countWebAuthn = Number(this.countWebAuthn) + 1
              break;
          }
          break;
      }

    }
    console.log('MFA type call : ' + this.countCallType);
    console.log('MFA type email : ' + this.countEmail);
    console.log('MFA type push : ' + this.countPush);
    console.log('MFA type security question : ' + this.countQ);
    console.log('MFA type sms : ' + this.countSMS);
    console.log('MFA type HW token : ' + this.countHOTP);
    console.log('MFA type HW otp : ' + this.countSOTP);
    console.log('MFA type SW otp : ' + this.countToken);
    console.log('MFA type token : ' + this.countU2F);
    console.log('MFA type u2f : ' + this.countWeb);
    console.log('MFA type webauthn : ' + this.countWebAuthn);


    console.log('Filling chart with data');
    this.MFATypeData[0].data[0] = this.countCallType;
    this.MFATypeData[0].data[1] = this.countEmail;
    this.MFATypeData[0].data[2] = this.countPush;
    this.MFATypeData[0].data[3] = this.countQ;
    this.MFATypeData[0].data[4] = this.countSMS;
    this.MFATypeData[0].data[5] = this.countHWToken;
    this.MFATypeData[0].data[6] = this.countHOTP;
    this.MFATypeData[0].data[7] = this.countSOTP;
    this.MFATypeData[0].data[8] = this.countToken;
    this.MFATypeData[0].data[9] = this.countU2F;
    this.MFATypeData[0].data[10] = this.countWeb;
    this.MFATypeData[0].data[11] = this.countWebAuthn;
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