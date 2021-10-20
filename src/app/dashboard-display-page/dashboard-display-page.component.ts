import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ViewEncapsulation } from '@angular/core';
// import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { OktaConfig } from "app/shared/okta/okta-config";
//import { AuthService } from "app/shared/okta/okta-authentication";
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

  authService = new OktaAuth(this.oktaSDKAuth.config);
  strUserSession: Boolean;
  public strAwaitSession;

  constructor(private http: HttpClient, private OktaConfig: OktaConfig, private oktaSDKAuth: OktaSDKAuthService) { }

  async ngOnInit() {

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
  }


}



// this.strSessionMe = '/api/v1/users/me';
//     this.strOktaURI = '';
//     this.strSSWSKey = '';

//     this.strOktaURI = this.cookieService.get('orgURL');
//     this.strSSWSKey = this.cookieService.get('orgAPI');

//     console.log('You org URL found in cookie : ' + this.strOktaURI);
//     console.log('You API key found in cookie : ' + this.strSSWSKey);
//     this.strConfirmed = "";
//     this.RetOrgURL = this.strOktaURI;
//     this.RetAPIKey = this.strSSWSKey;

//     console.log("Your URL is : " + this.RetOrgURL);
//     console.log("Your API Key is : " + this.RetAPIKey);

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Accept", "application/json");
//     myHeaders.append("Authorization", "SSWS " + this.RetAPIKey);
//     var requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//     };
//     //Get user with API key found in the cookie
//     fetch(this.RetOrgURL + this.strSessionMe, requestOptions)
//       //Success
//       .then(response => response.json())
//       //Error 
//       .catch(error => {
//         console.log('error', error)

//       }
//       );
//     this.strUserID = await fetch(this.RetOrgURL + this.strSessionMe, requestOptions).then(response => response.json())
//     console.log(this.strUserID);
//     console.log(this.strUserID.profile.email);
//     this.strWelcome = "Welcome "
//     // this.strConfirmed = this.strUserID.profile.email;
//     this.strConfirmed = this.strUserID.profile.firstName + " " + this.strUserID.profile.lastName;