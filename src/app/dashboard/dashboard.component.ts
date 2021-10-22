import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
//import { OktaAuth } from "@okta/okta-auth-js";


// Needs to be the below versions
//npm install ng2-charts@2.3.0 --save
// npm i chart.js@2.9.0
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  strAccessToken;
  strAllUsersFilter = '/api/v1/users'
  strURL;

  //Consumes License
  strActiveUserFilter = '/api/v1/users?filter=status%20eq%20%22ACTIVE%22';
  numActiveUsers;

  strRecoveryUserFilter = '/api/v1/users?filter=status%20eq%20%22RECOVERY%22';
  numRecoveryUsers;

  strPWExpiredFilter = '/api/v1/users?filter=status%20eq%20%22PASSWORD_EXPIRED%22';
  numPWExpiredUsers;

  strLockedOutFilter = '/api/v1/users?filter=status%20eq%20%22LOCKED_OUT%22';
  numLockedOutUsers;

  strSuspendedFilter = '/api/v1/users?filter=status%20eq%20%22SUSPENDED%22';
  numSuspendedUsers

  //Doesn't Consumes License
  strProvisionedUsersFilter = '/api/v1/users?filter=status%20eq%20%22PROVISIONED%22';
  numProvisionedUsers;

  strStagedUsersFilter = '/api/v1/users?filter=status%20eq%20%22STAGED%22';
  numStagedUsers;

  strDeprovisionedFilter = '/api/v1/users?filter=status%20eq%20%22DEPROVISIONED%22';
  numDeprovisionedUsers;

  
  ////Chart Options
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {data: [100, 200, 70, 600, 450, 300], label: '月別降水量' }
  ];
  constructor(private http: HttpClient, private OktaConfig: OktaConfig, private OktaAuthClient: OktaSDKAuthService) { }

  ngOnInit() {

  }

  async GetUsers() {
    this.strURL = this.OktaConfig.strBaseURI + this.strRecoveryUserFilter;
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    console.log(this.strAccessToken);
    this.GetStagedUsers();
    this.GetProvisionedUsers();
    this.GetActiveUsers();
    this.GetRecoveryUsers();
    this.GetLockedoutUsers();
    this.GetSuspendedUsers();
    this.GetDeprovisionedUsers();
  }
  async GetDeprovisionedUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strDeprovisionedFilter;
    //console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + stringAccessToken,
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

    /////////////////////////////////////
    await fetchRequest(this.strURL).then(data =>
      this.numDeprovisionedUsers = data.length

    );
    /////////////////////////////////////
    await fetchRequest(this.strURL);
    console.log('Users in DEPROVISIONED state : ' + this.numDeprovisionedUsers);
  }



  async GetSuspendedUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strSuspendedFilter;
    //console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + stringAccessToken,
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

    /////////////////////////////////////
    await fetchRequest(this.strURL).then(data =>
      this.numSuspendedUsers = data.length

    );
    /////////////////////////////////////
    await fetchRequest(this.strURL);
    console.log('Users in SUSPENDED state : ' + this.numSuspendedUsers);
  }


  async GetLockedoutUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strLockedOutFilter;
    //console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + stringAccessToken,
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

    /////////////////////////////////////
    await fetchRequest(this.strURL).then(data =>
      this.numLockedOutUsers = data.length

    );
    /////////////////////////////////////
    await fetchRequest(this.strURL);
    console.log('Users in LOCKED_OUT state : ' + this.numLockedOutUsers);
  }

  async GetRecoveryUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strRecoveryUserFilter;
    //console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + stringAccessToken,
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

    /////////////////////////////////////
    await fetchRequest(this.strURL).then(data =>
      this.numRecoveryUsers = data.length

    );
    /////////////////////////////////////
    await fetchRequest(this.strURL);
    console.log('Users in RECOVERY state : ' + this.numRecoveryUsers);
  }

  async GetActiveUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strActiveUserFilter;
    //console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + stringAccessToken,
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

    /////////////////////////////////////
    await fetchRequest(this.strURL).then(data =>
      this.numActiveUsers = data.length

    );
    /////////////////////////////////////
    await fetchRequest(this.strURL);
    console.log('Users in ACTIVE state : ' + this.numActiveUsers);
  }


  async GetStagedUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strStagedUsersFilter;
    //console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + stringAccessToken,
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

    /////////////////////////////////////
    await fetchRequest(this.strURL).then(data =>
      this.numStagedUsers = data.length
    );
    /////////////////////////////////////
    await fetchRequest(this.strURL);
    console.log('Users in STAGED state : ' + this.numStagedUsers);
  }


  async GetProvisionedUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strProvisionedUsersFilter;
    //console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + stringAccessToken,
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

    /////////////////////////////////////
    await fetchRequest(this.strURL).then(data =>
      this.numProvisionedUsers = data.length
    );
    /////////////////////////////////////
    await fetchRequest(this.strURL);
    console.log('Users in PROVISIONED state : ' + this.numProvisionedUsers);
  }


  async GetAllUsers() {
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    // console.log("Access Token : " + this.strAccessToken);
    this.strURL = this.OktaConfig.strBaseURI + this.strAllUsersFilter;
    //console.log(this.strAccessToken);
    let stringAccessToken = this.strAccessToken;
    /////////////////////////////////////
    async function fetchRequest(url) {

      try {
        // Fetch request and parse as JSON
        const response = await fetch(url, {
          headers: new Headers({
            'Authorization': 'Bearer ' + stringAccessToken,
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

    /////////////////////////////////////
    await fetchRequest(this.strURL).then(data =>
      console.log(data)
    );
    /////////////////////////////////////
    await fetchRequest(this.strURL);
    //console.log(this.numProvisionedUsers);
  }
}