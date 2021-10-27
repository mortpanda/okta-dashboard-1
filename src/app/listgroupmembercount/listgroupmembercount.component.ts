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

export interface PeriodicElement {
  // position: number;
  Name: string;
  Members: number;
  Type: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Name: "a", Members: 0, Type: "a" },

];

@Component({
  selector: 'app-listgroupmembercount',
  templateUrl: './listgroupmembercount.component.html',
  styleUrls: ['./listgroupmembercount.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListgroupmembercountComponent implements OnInit {
  strAccessToken;
  strURL;
  strData;
  countOkta;
  countWindows;
  strUserArraySize;
  arrGroupJson: any = {};
  intArrayLength;
  GroupList;

  displayedColumns: string[] = ['Name', 'Members', 'Type'];
  //dataSource = ELEMENT_DATA;


  dataSource = new MatTableDataSource(ELEMENT_DATA);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar) { }

  async ngOnInit() {
  }
  async GetGroupMembers() {
    this._snackBar.open('Data Download in Progress');
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    console.log(this.strAccessToken);
    const UpdateAllGroupsCharts = async () => {
      const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strAllGroupsFilter, this.strAccessToken)
    }
    await UpdateAllGroupsCharts();
    this._snackBar.dismiss();

  }

  async FunctionGetUserCount(strUserCountURL, myToken) {
    localStorage.removeItem('okta_groups');
    var strUserType;
    console.log('Calling... : ' + strUserCountURL);
    /////////////////////////////////////
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
    // Work on the data
    /////////////////////////////////////
    await fetchRequest(strUserCountURL).then(data => {
      var aggregatedData = [];
      this.intArrayLength = 0;
      this.countOkta = 0;
      this.countWindows = 0;
      aggregatedData = aggregatedData.concat(data)
      for (var i = 0; i < aggregatedData.length; i++) {
        this.intArrayLength = Number(this.intArrayLength) + 1;
        this.arrGroupJson[i] = {
          id: aggregatedData[i].id,
          name: aggregatedData[i].profile.name,
          objectClass: aggregatedData[i].objectClass[0],
          user: aggregatedData[i]._links.users
        };
        //this.arrGroupJson.push({id: + aggregatedData[i].id});
        switch (aggregatedData[i].objectClass[0].toLowerCase()) {
          case "okta:windows_security_principal":
            this.countWindows = Number(this.countWindows) + 1
            break;
          case "okta:user_group":
            this.countOkta = Number(this.countOkta) + 1
            break;
        }
      }
      console.log('Okta Groups : ' + this.countOkta);
      console.log('Windows Groups : ' + this.countWindows);
      console.log(aggregatedData);
    }
    );
    // Output from the get group function
    this.arrGroupJson.length = Number(this.intArrayLength);
    console.log(this.arrGroupJson);
    // Convert groups into string to prepare for localstorate
    const oktagroups = JSON.stringify(this.arrGroupJson);
    //Save to local storate
    localStorage.setItem('okta_groups', oktagroups);
    await fetchRequest(strUserCountURL);



  }


  FunctionFillTable() {
    console.log('Starting filling in the table using the information on the local storage');

    this.GroupList = JSON.parse(localStorage.getItem('okta_groups'));
    console.log(this.GroupList);
    for (var i = 0; i < this.GroupList.length; i++) {



      //Rename group type to more readable form
      var groupType = "";
      switch (this.GroupList[i].objectClass.toLowerCase()) {
        case "okta:user_group":
          groupType = "Okta group"  
        break;

        case "okta:windows_security_principal":
          groupType = "AD group"    
        break;
        default:
          groupType = "Others"    
          break;

      }
      ELEMENT_DATA[i] = {
        Name: this.GroupList[i].name,
        Members: 0,
        Type: groupType,
      }
    }
    this.dataSource.data = ELEMENT_DATA;
  }

}

// okta:windows_security_principal
// okta:user_group