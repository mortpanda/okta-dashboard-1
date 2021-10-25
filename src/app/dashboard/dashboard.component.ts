import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { ActiveusersComponent } from 'app/activeusers/activeusers.component';
import { InactiveusersComponent } from 'app/inactiveusers/inactiveusers.component';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { OktaConfig } from "app/shared/okta/okta-config";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  strAccessToken;
  strIDToken;

  constructor(private activeUsers: ActiveusersComponent, private inactiveUsers: InactiveusersComponent,private OktaAuthClient: OktaSDKAuthService,private OktaConfig:OktaConfig ) { }

  ngOnInit() {
    
    
    
    console.log(this.strAccessToken);
    this.strAccessToken = this.OktaAuthClient.OktaSDKAuthClient.getAccessToken();
    this.strIDToken = this.OktaAuthClient.OktaSDKAuthClient.getIdToken;

    // var tokenToRenew = {
    //   idToken: this.strIDToken,
    //   claims: this.OktaConfig.strScope,
    //   //expiresAt: 1449699930,
    //   scopes: ['openid', 'email'],
    //   authorizeUrl: 'https://{yourOktaDomain}/oauth2/v1/authorize',
    //   issuer: 'https://{yourOktaDomain}',
    //   clientId: 'NPSfOkH5eZrTy8PMDlvx'
    // };


    //var renewedToken = this.OktaAuthClient.OktaSDKAuthClient.token.renew(this.strAccessToken);
  }

  // async GetAllUsers() {
  //   this.activeUsers.GetUsers();
  //   this.inactiveUsers.GetInactiveUsers();
  // }


}
