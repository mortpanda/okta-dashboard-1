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

@Component({
  selector: 'app-admingroups',
  templateUrl: './admingroups.component.html',
  styleUrls: ['./admingroups.component.css']
})
export class AdmingroupsComponent implements OnInit {

  strAccessToken;
  strURL;
  strData;
  countAdminGroup;
  countNONEAdminGroup
  strUserArraySize;
  arrGroupJson: any = {};
  // //// Active User Chart Options
  public barChartColor4: any[] = [
    {
      backgroundColor: ["#00297A", "#3C2B57", "#095661", "#CC8A00", "#EC3629"]
    }
  ];
  public barChartOptions4: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
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
  public barChartLabels4: Label[] = ['Admin = True', 'Admin = False'];
  public barChartType4: ChartType = 'bar';
  public barChartLegend4 = false;
  public barChartPlugins4 = [];
  public barChartData4: ChartDataSets[] = [
    { data: [0, 0], label: 'Groups' }
  ];

  @ViewChild(BaseChartDirective)
  public chart3: BaseChartDirective;

  constructor(private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService, private cookieService: CookieService
    , private _snackBar: MatSnackBar) { }

  updateChart() {
    this.chart3.update();
  }


  async ngOnInit() {
  
  }


  async GetGroups() {

    this._snackBar.open('Data Download in Progress');
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    console.log(this.strAccessToken);
    const UpdateAllGroupsCharts = async () => {
      const strResult = await this.FunctionGetUserCount(this.OktaConfig.strBaseURI + this.OktaConfig.strAllGroupsFilter, this.strAccessToken)
    }
    await UpdateAllGroupsCharts();
    this.updateChart();
    this._snackBar.dismiss();

  }

  async FunctionGetUserCount(strUserCountURL, myToken) {

    //this.numActiveUsers = '';
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
      var aggregatedAdminGroupData = [];

      this.countAdminGroup = 0;
      this.countNONEAdminGroup = 0;
      aggregatedAdminGroupData = aggregatedAdminGroupData.concat(data)
      for (var i = 0; i < aggregatedAdminGroupData.length; i++) {
        //console.log(aggregatedData[i].objectClass[0])
        //this.arrGroupJson = aggregatedData[i].id;
        // this.arrGroupJson[i] = aggregatedData[i].profile.name;
        // this.arrGroupJson[i] = aggregatedData[i].objectClass[0];
        //const groupID = aggregatedData[i].id;
        this.arrGroupJson[i] = {
          id: aggregatedAdminGroupData[i].id,
          name: aggregatedAdminGroupData[i].profile.name,
          objectClass: aggregatedAdminGroupData[i].objectClass[0],
          user: aggregatedAdminGroupData[i]._links.users
        };

          //[1]._embedded.stats.hasAdminPrivilege

        //this.arrGroupJson.push({id: + aggregatedData[i].id});

        switch (aggregatedAdminGroupData[i]._embedded.stats.hasAdminPrivilege) {
          case true:
            this.countAdminGroup = Number(this.countAdminGroup) + 1
            break;
          case false:
            this.countNONEAdminGroup = Number(this.countNONEAdminGroup) + 1
            break;
        }


      }
      console.log('Groups with Admin : ' + this.countAdminGroup);
      console.log('Groups WITHOUT Admin : ' + this.countNONEAdminGroup);
      console.log(aggregatedAdminGroupData);
      this.strUserArraySize = data.length;
    }
    );

    this.barChartData4[0].data[0] = Number(this.countAdminGroup);
    this.barChartData4[0].data[1] = Number(this.countNONEAdminGroup);
    // Output from the get group function
    console.log(this.arrGroupJson);
    
    // const myDate = new Date();
    // myDate.setHours(myDate.getHours() + 1);

    // Convert groups into string to prepare for localstorate
    //const oktagroups = JSON.stringify(this.arrGroupJson);
    
    //Save to local storate
    //localStorage.setItem('okta_groups',oktagroups);
    
    //const localstoragetest = localStorage.getItem('okta_groups');
    //console.log(JSON.parse(localstoragetest));

    //console.log(this.arrGroupJson[0].id);
    await fetchRequest(strUserCountURL);
    //console.log(strUserType + this.strUserArraySize);
  }

}
