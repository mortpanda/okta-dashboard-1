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
  selector: 'app-mfaprovider',
  templateUrl: './mfaprovider.component.html',
  styleUrls: ['./mfaprovider.component.css']
})
export class MfaproviderComponent implements OnInit {
  //strAccessToken;
  //strAllUsersFilter = '/api/v1/users'
  strURL;
  strData;

  strMFATypeArraySize;

  //Factor Types
  countDUO;
  countFIDO;
  countGoogle;
  countOkta;
  countRSA;
  countSymantec;
  countYubico;
  countProviderOthers;
  countDelauth;


  arrFactorProviderJSON: any = {};

  //// Active User Chart Options
  public MFAProviderColor: any[] = [
    {
      backgroundColor: ["#3C2B57", "#095661", "#CC8A00", "#00297A", "#EC3629", "#CFB1C1", "#E97107", "#FAAFA3", "#A0DCC3", "#FAD28C"]
    }
  ];

  public MFAProviderOptions: ChartOptions = {
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
  public MFAProviderLabel: Label[] = ['DUO', 'FIDO', 'Google', 'Okta', 'RSA', 'Symantec', 'Yubico', 'Del Auth', 'Others'];
  public MFAProviderChart: ChartType = 'bar';
  public MFAProviderLegend = false;
  public MFAProviderPlugin = [];
  public MFAProviderData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Factor Provider' }
  ];

  // @ViewChild(BaseChartDirective)
  // public chart: BaseChartDirective;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

  async ngOnInit() {
    //await this.DataloadComponent.ngOnInit();
    this.countDUO = 0;
    this.countFIDO = 0;
    this.countGoogle = 0;
    this.countOkta = 0;
    this.countRSA = 0;
    this.countSymantec
    this.countYubico = 0;
    this.countProviderOthers = 0;
    this.countDelauth = 0;

    var strArrayFactorProvidersTypes = localStorage.getItem('okta_mfas');
    this.arrFactorProviderJSON = JSON.parse(strArrayFactorProvidersTypes);
    console.log(this.arrFactorProviderJSON);



    for (var i = 0; i < this.arrFactorProviderJSON.length; i++) {

      switch (this.arrFactorProviderJSON[i].status) {
        case "ACTIVE":

          switch (this.arrFactorProviderJSON[i].provider) {
            case "DUO":
              this.countDUO = Number(this.countDUO) + 1
              break;
            case "FIDO":
              this.countFIDO = Number(this.countFIDO) + 1
              break;
            case "GOOGLE":
              this.countGoogle = Number(this.countGoogle) + 1
              break;
            case "OKTA":
              this.countOkta = Number(this.countOkta) + 1
              break;
            case "RSA":
              this.countRSA = Number(this.countRSA) + 1
              break;
            case "SYMANTEC":
              this.countSymantec = Number(this.countSymantec) + 1
              break;
            case "YUBICO":
              this.countYubico = Number(this.countYubico) + 1
              break;
            case "DEL_AUTH":
              this.countDelauth = Number(this.countDelauth) + 1
              break;
            case "CUSTOM":
              this.countProviderOthers = Number(this.countProviderOthers) + 1
              break;

          }
          break;
      }

    }
    console.log('MFA provider type DUO : ' + this.countDUO);
    console.log('MFA provider type FIDO : ' + this.countFIDO);
    console.log('MFA provider type Google : ' + this.countGoogle);
    console.log('MFA provider type Okta : ' + this.countOkta);
    console.log('MFA provider type RSA : ' + this.countRSA);
    console.log('MFA provider type Symantec : ' + this.countSymantec);
    console.log('MFA provider type Yubico : ' + this.countYubico);
    console.log('MFA provider type Del Auth : ' + this.countDelauth);
    console.log('MFA provider type Others : ' + this.countProviderOthers);



    console.log('Filling chart with data');
    this.MFAProviderData[0].data[0] = this.countDUO;
    this.MFAProviderData[0].data[1] = this.countFIDO;
    this.MFAProviderData[0].data[2] = this.countGoogle
    this.MFAProviderData[0].data[3] = this.countOkta;
    this.MFAProviderData[0].data[4] = this.countRSA;
    this.MFAProviderData[0].data[5] = this.countSymantec;
    this.MFAProviderData[0].data[6] = this.countYubico;
    this.MFAProviderData[0].data[7] = this.countDelauth;
    this.MFAProviderData[0].data[8] = this.countProviderOthers;

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