import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import {
  OktaAuth,
  OktaAuthOptions,
  TokenManager,
  AccessToken,
  IDToken,
  UserClaims,
  TokenParams
} from '@okta/okta-auth-js'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
//import { OktaChecktokenService } from 'app/shared/okta/okta-checktoken.service';

@Component({
  selector: 'app-dashboard-display-page',
  templateUrl: './dashboard-display-page.component.html',
  styleUrls: ['./dashboard-display-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardDisplayPageComponent implements OnInit {
  public strUserLoggedin;
  public strUserID;
  public strWelcome;
  strAccessToken;
  strIDToken;
  authService = new OktaAuth(this.oktaSDKAuth.config);
  strUserSession: Boolean;
  public strAwaitSession;

  constructor(private http: HttpClient, private OktaConfig: OktaConfig,
    private oktaSDKAuth: OktaSDKAuthService, private _snackBar: MatSnackBar
    , private cookieService: CookieService, private OktaAuthClient: OktaSDKAuthService) { }

  async ngOnInit() {

    //Check the access token validity
    //Get the current time
    // const secondsSinceEpoch = Math.round(Date.now() / 1000)
    // console.log('Time now : ' + secondsSinceEpoch);

    // //Get the token expiration time
    // this.strIDToken = this.OktaAuthClient.OktaSDKAuthClient.tokenManager.getTokensSync().idToken;
    // console.log('Expiration time on token : ' + this.strIDToken.expiresAt)

    // if (Number(secondsSinceEpoch) > Number(this.strIDToken.expiresAt)) {
    //   //Perform logout if the token has expired  
    //   this.OktaLogout();
    // }
    // else {

      this.strUserSession = await this.authService.session.exists()
        .then(function (exists) {
          if (exists) {
            // logged in
            console.log("User session to Okta : " + exists);
            return exists
          } else {
            // not logged in
            console.log("User session to Okta : " + exists);

            return exists
          }
        });
      switch (this.strUserSession == true) {
        case false:
          this._snackBar.open('Please login before you access this page.');
          console.log("User session not found, redirecting to " + this.OktaConfig.strPostLogoutURL);
          window.location.replace(this.OktaConfig.strPostLogoutURL);

        case true:
          var strSession = this.authService.token.getWithoutPrompt({
            responseType: 'id_token', // or array of types
            sessionToken: 'testSessionToken', // optional if the user has an existing Okta session           
          })
            .then(function (res) {
              var tokens = res.tokens;
              console.log("Displaying user token information");
              console.log(res.tokens);
              //console.log(res.state);
              var strUser = tokens.idToken.claims.email;
              //console.log(strUser);
              return tokens.idToken.claims.email;
            }
            )
          this.strAwaitSession = await this.authService.token.getWithoutPrompt()
          const strUserGet = async () => {
            const strUseremail = await strSession;
            console.log(strUseremail)
            this.strWelcome = "Welcome "
            this.strUserLoggedin = strUseremail;
          }
          if (location.pathname == "/dashboard") {
            //If not in the dashboard page, don't get the current user
          }
          else {
            strUserGet();
          }

      }
    // }
  }
  OktaLogout() {
    this.OktaAuthClient.OktaSDKAuthClient.signOut();
    this.cookieService.deleteAll();
  }

  // TokenExpired(){
  //   this.OktaChecktokenService.SessionExpire();
  // }
}

