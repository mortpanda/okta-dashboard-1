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
  selector: 'app-listgroups',
  templateUrl: './listgroups.component.html',
  styleUrls: ['./listgroups.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListgroupsComponent implements OnInit {

  strAccessToken;
  strURL;
  strData;
  countOktaGroup;
  countWindowsGroup;
  countOtherGroups;
  strGroupArraySize;
  arrGroupJson: any = {};

  // //// Active User Chart Options
  public barChartColor3: any[] = [
    {
      backgroundColor: ["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629"]
    }
  ];
  public barChartOptions3: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
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
  public barChartLabels3: Label[] = ['Okta Groups', 'Windows Groups', 'Other Goups'];
  public barChartType3: ChartType = 'bar';
  public barChartLegend3 = false;
  public barChartPlugins3 = [];
  public barChartData3: ChartDataSets[] = [
    { data: [0, 0, 0], label: 'Groups' }
  ];

  // @ViewChild(BaseChartDirective)
  // public chart3: BaseChartDirective;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints) { }

  // updateChart() {
  //   this.chart3.update();
  // }


  
  async ngOnInit() {
    //await this.DataloadComponent.ngOnInit();
    this.countOktaGroup = 0;
    this.countWindowsGroup = 0;
    // this.countLDAP = 0;
    // this.countSocial = 0;
    // this.countImport = 0;
    // this.countOthers = 0;
    var strArrayGroups = localStorage.getItem('okta_groups');
    this.arrGroupJson = JSON.parse(strArrayGroups);
    console.log(this.arrGroupJson);
    for (var i = 0; i < this.arrGroupJson.length; i++) {
      switch (this.arrGroupJson[i].objectClass[0]) {
        case "okta:user_group":
          this.countOktaGroup = Number(this.countOktaGroup) + 1
          break;
        case "okta:windows_security_principal":
          this.countWindowsGroup = Number(this.countWindowsGroup) + 1
          break;
        // case "LDAP":
        //   this.countLDAP = Number(this.countLDAP) + 1
        //   break;
        // case "SOCIAL":
        //   this.countSocial = Number(this.countSocial) + 1
        //   break;
        // case "IMPORT":
        //   this.countImport = Number(this.countImport) + 1
        //   break;
        default:
          this.countOtherGroups = Number(this.countOtherGroups) + 1
          break;
      }
    }
    console.log('Okta Groups : ' + this.countOktaGroup);
    console.log('AD Groups : ' + this.countWindowsGroup);
    console.log('Other Groups : ' + this.countOtherGroups);
    // console.log('Imported Users Users : ' + this.countSocial);
    // console.log('AD Users : ' + this.countImport);
    // console.log('Others Users : ' + this.countOthers);
    console.log('Filling chart with data');
    this.barChartData3[0].data[0] = this.countOktaGroup;
    this.barChartData3[0].data[1] = this.countWindowsGroup;
    this.barChartData3[0].data[2] = this.countOtherGroups;
    
    
  }

  

}


// async GetGroups() {

//   this._snackBar.open('Data Download in Progress');
//   this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
//   console.log(this.strAccessToken);
//   const UpdateAllGroupsCharts = async () => {
//     const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strAllGroupsFilter, this.strAccessToken)
//   }
//   await UpdateAllGroupsCharts();
//   //this.updateChart();
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
//     var aggregatedData = [];
    
//     this.countOkta = 0;
//     this.countWindows = 0;
//     aggregatedData = aggregatedData.concat(data)
//     for (var i = 0; i < aggregatedData.length; i++) {
//       //console.log(aggregatedData[i].objectClass[0])
//       //this.arrGroupJson = aggregatedData[i].id;
//       // this.arrGroupJson[i] = aggregatedData[i].profile.name;
//       // this.arrGroupJson[i] = aggregatedData[i].objectClass[0];
//       //const groupID = aggregatedData[i].id;
//       this.arrGroupJson[i] = {
//         id: aggregatedData[i].id,
//         name: aggregatedData[i].profile.name,
//         objectClass: aggregatedData[i].objectClass[0],
//         user: aggregatedData[i]._links.users
//       };


//       //this.arrGroupJson.push({id: + aggregatedData[i].id});

//       switch (aggregatedData[i].objectClass[0].toLowerCase()) {
//         case "okta:windows_security_principal":
//           this.countWindows = Number(this.countWindows) + 1
//           break;
//         case "okta:user_group":
//           this.countOkta = Number(this.countOkta) + 1
//           break;
//       }


//     }
//     console.log('Okta Groups : ' + this.countOkta);
//     console.log('Windows Groups : ' + this.countWindows);
//     console.log(aggregatedData);
//     this.strUserArraySize = data.length;
//   }
//   );

//   this.barChartData3[0].data[0] = Number(this.countOkta);
//   this.barChartData3[0].data[1] = Number(this.countWindows);
//   // Output from the get group function
//   console.log(this.arrGroupJson);
  
//   // const myDate = new Date();
//   // myDate.setHours(myDate.getHours() + 1);

//   // Convert groups into string to prepare for localstorate
//   //const oktagroups = JSON.stringify(this.arrGroupJson);
  
//   //Save to local storate
//   //localStorage.setItem('okta_groups',oktagroups);
  
//   //const localstoragetest = localStorage.getItem('okta_groups');
//   //console.log(JSON.parse(localstoragetest));

//   //console.log(this.arrGroupJson[0].id);
//   await fetchRequest(strUserCountURL);
//   //console.log(strUserType + this.strUserArraySize);
// }