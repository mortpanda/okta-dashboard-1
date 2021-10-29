import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { CookieService } from 'ngx-cookie-service';
import { OktaApiEndpoints } from 'app/shared/okta/okta-api-endpoints'
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatTableModule } from '@angular/material/table';
// import { MatTableDataSource } from '@angular/material/table';
import { OktaChecktokenService } from 'app/shared/okta/okta-checktoken.service';
import { OktausersdownloadService } from 'app/shared/okta/oktausersdownload.service';
import { OktagroupsdownloadService } from 'app/shared/okta/oktagroupsdownload.service';
import { OktaappsdownloadService } from 'app/shared/okta/oktaappsdownload.service';
import { DataloadComponent } from 'app/dataload/dataload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  timeNow;
  loggedinTime;
  timeDiff
  bolCheckedLoogedin;


  constructor(public _matdialog: MatDialog, private DataloadComponent: DataloadComponent,
    private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar, private OktaApiEndpoints: OktaApiEndpoints, private OktaChecktokenService: OktaChecktokenService
    , private OktausersdownloadService: OktausersdownloadService, private OktagroupsdownloadService: OktagroupsdownloadService
    , private OktaappsdownloadService: OktaappsdownloadService) { }

  ngOnInit(): void {
    this.OktaChecktokenService.functionCheckToken();


    this.timeNow = Math.round(Date.now() / 1000)
    console.log('Time now : ' + this.timeNow);
    this.bolCheckedLoogedin = this.cookieService.check('okta_loggedin_time');
    this.loggedinTime = this.cookieService.get('okta_loggedin_time');

    if (this.bolCheckedLoogedin = false) {
      console.log('okta_loggedin_time does not exist in cookie')
      this.openDialog();
    }
    else {

      console.log('Loggedin time : ' + this.loggedinTime);
      // console.log('Logged in time now : ' + this.secondsSinceEpoch);
      // this.cookieService.set('okta_loggedin_time', this.secondsSinceEpoch);
      this.timeDiff = this.timeNow - this.loggedinTime
      console.log('Time difference is : ' + this.timeDiff + " seconds")

      if (Number(this.timeDiff) > 3600) {
        console.log('The data is more than 1 hours old, downloading a new set....');
        this.openDialog();

      }
      else {
        console.log('The data was obtained from Okta less than an hour ago.  Not downloading.');
      }
    }

  }


  async openDialog(): Promise<number> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "widget-modal-component";
    dialogConfig.height = "270px";
    dialogConfig.width = "400px";

    const dialogRef = this._matdialog.open(DataloadComponent, dialogConfig);
    return dialogRef.afterClosed()
      .toPromise() // here you have a Promise instead an Observable
      .then(result => {
        //this.sheetIndex = result;
        return Promise.resolve(result); // will return a Promise here
      });
  }


}


// async GetApps() {

//   this._snackBar.open('Data Download in Progress');
//   localStorage.removeItem('okta_apps');
//   this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
//   console.log(this.strAccessToken);
//   const UpdateAppsCharts = async () => {
//     //const strResult = await this.FunctionGetApps(this.OktaConfig.strBaseURI + this.OktaApiEndpoints.strAllApps, this.strAccessToken)
//     //const strResult = await this.OktausersdownloadService.GetUsers();
//     //const strResult = await this.OktagroupsdownloadService.GetGroups();
//     const strResult = await this.OktaappsdownloadService.GetApps();
//   }
//   await UpdateAppsCharts();
//   this._snackBar.dismiss();

//   this._snackBar.open('Data download completed','Close');

// }


// async FunctionGetApps(strUserCountURL, myToken) {
//   // ELEMENT_DATA = [];
//   // this.dataSource.data = ELEMENT_DATA;

//   //localStorage.removeItem('okta_groups');
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
//     var aggregateAppData = [];
//     // this.intAppArrayLength = 0;
//     // this.countOktaGroup = 0;
//     // this.countWindows = 0;
//     aggregateAppData = aggregateAppData.concat(data)
//      for (var i = 0; i < aggregateAppData.length; i++) {
//       // this.intAppArrayLength = Number(this.intAppArrayLength) + 1;

//       // this.arrAppsJson[i] = {
//       //   id: aggregateAppData[i].id,
//       //   label: aggregateAppData[i].label,
//       //   status: aggregateAppData[i].status,
//       //   //user: aggregatedData[i]._links.users,
//       //   features: aggregateAppData[i].features,
//       //   //assignedAppsCount: aggregateAppData[i]._embedded.stats.appsCount,
//       //   //adminGroup: aggregateAppData[i]._embedded.stats.hasAdminPrivilege,
//       //   //groupPush: aggregateAppData[i]._embedded.stats.groupPushMappingsCount,
//       // };

//       //this.arrGroupJson.push({id: + aggregatedData[i].id});
//       // switch (aggregatedData[i].objectClass[0].toLowerCase()) {
//       //   case "okta:windows_security_principal":
//       //     this.countWindows = Number(this.countWindows) + 1
//       //     break;
//       //   case "okta:user_group":
//       //     this.countOktaGroup = Number(this.countOktaGroup) + 1
//       //     break;
//       }
//       console.log(aggregateAppData);
//       this.arrAppsJson = aggregateAppData;
//     }
//   )
//     // console.log('Okta Groups : ' + this.countOktaGroup);
//     // console.log('Windows Groups : ' + this.countWindows);

//   // }
//   // );

//   // Output from the get group function
//   //this.arrAppsJson.length = Number(this.intAppArrayLength);
//   // console.log(this.arrGroupJson);
//   // Convert groups into string to prepare for localstorate
//   const oktaApps = JSON.stringify(this.arrAppsJson);
//   //Save to local storate
//   localStorage.setItem('okta_apps', oktaApps);
//   await fetchRequest(strUserCountURL);

//   // this.FunctionFillTable();

// }

// FunctionFillTable() {
  //   console.log('Starting filling in the table using the information on the local storage');
  //   this.GroupList = JSON.parse(localStorage.getItem('okta_groups'));
  //   console.log(this.GroupList);
  //   for (var i = 0; i < this.GroupList.length; i++) {
  //     //Rename group type to more readable form
  //     var groupType = "";
  //     switch (this.GroupList[i].objectClass.toLowerCase()) {
  //       case "okta:user_group":
  //         groupType = "Okta group"
  //         break;

  //       case "okta:windows_security_principal":
  //         groupType = "AD group"
  //         break;
  //       default:
  //         groupType = "Others"
  //         break;

  //     }
  //     ELEMENT_DATA[i] = {
  //       Name: this.GroupList[i].name,
  //       Admin: this.GroupList[i].adminGroup,
  //       Members: this.GroupList[i].memberCount,
  //       Apps: this.GroupList[i].assignedAppsCount,
  //       Pushgroups: this.GroupList[i].groupPush,
  //       Type: groupType,

  //     }
  //   }
  //   this.dataSource.data = ELEMENT_DATA;
  // }
