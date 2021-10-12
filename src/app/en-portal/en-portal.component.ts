import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { OktaConfig } from "app/shared/okta/okta-config";
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
  selector: 'app-en-portal',
  templateUrl: './en-portal.component.html',
  styleUrls: ['./en-portal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnPortalComponent implements OnInit {
  UserLoggedIn: any;
  strWelcome: any;
  authService = new OktaAuth(this.oktaSDKAuth.config);
  strUserSession: Boolean;

  strMemberSite: any;
  strMemberBBS: any;
  strMemberMoodle: any;

  strGroupMemberships: any;
  arrGroups: any;
  

  constructor(private _snackBar: MatSnackBar, private oktaSDKAuth: OktaSDKAuthService,private OktaConfig: OktaConfig) { }

  async ngOnInit() {
    document.getElementById("memberSite").style.visibility = "hidden";
    document.getElementById("memberBBS").style.visibility = "hidden";
    document.getElementById("memberMoodle").style.visibility = "hidden";
    document.getElementById("memberDentaku").style.visibility = "hidden";
    
    this.strUserSession = await this.authService.session.exists()
      .then(function (exists) {
        if (exists) {
          // logged in
          console.log(exists);
          return exists
        } else {
          // not logged in
          //console.log(exists);
          
          return exists
        }
      });

    switch (this.strUserSession == true) {
      case false:
      //alert(this.oktaSDKAuth.config.redirectUri)
      // this.openSnackBar()
      console.log(this.OktaConfig.strPostLogoutURL);
      window.location.replace(this.OktaConfig.strPostLogoutURL);

      case true:
        var strSession = this.authService.token.getWithoutPrompt({
          responseType: 'id_token', // or array of types
          sessionToken: 'testSessionToken', // optional if the user has an existing Okta session           
        })
          .then(function (res) {
            var tokens = res.tokens;
            console.log(res.tokens);
            //console.log(res.state);
            var strUser = tokens.idToken.claims.email;
            //console.log(strUser);
            return tokens.idToken.claims.email;
          }
          )

        this.strGroupMemberships = await this.authService.token.getWithoutPrompt()
        // console.log(this.strGroupMemberships.tokens.idToken.claims.okta_groups);
        // console.log(this.strGroupMemberships.tokens.idToken.claims.okta_groups.length);
        this.arrGroups = this.strGroupMemberships.tokens.idToken.claims.okta_groups;

        for (var i = 0; i < this.strGroupMemberships.tokens.idToken.claims.okta_groups.length; i++) {
          //console.log(this.arrGroups[i]);
          switch ((this.arrGroups[i].toUpperCase())) {
            case "ANGULAR-CIAM-DEMO-PORTAL-MOODLE":
              console.log("found group " + this.arrGroups[i].toUpperCase());
              console.log("Displaying Moodle to the user....")
              document.getElementById("memberMoodle").style.visibility = "visible";
              break;

            case "ANGULAR-CIAM-DEMO-PORTAL-WORDPRESS":
              console.log("found group " + this.arrGroups[i].toUpperCase());
              console.log("Displaying Wordpress to the user....")
              document.getElementById("memberSite").style.visibility = "visible";
              break;

            case "ANGULAR-CIAM-DEMO-PORTAL-WORDPRESS-BB":
              console.log("found group " + this.arrGroups[i].toUpperCase());
              console.log("Displaying Wordpress BBS to the user....")
              document.getElementById("memberBBS").style.visibility = "visible";
              break;

              case "ANGULAR-CIAM-DEMO-PORTAL-CALCULATOR":
                console.log("found group " + this.arrGroups[i].toUpperCase());
                console.log("Displaying Dentaku to the user....")
                document.getElementById("memberDentaku").style.visibility = "visible";
                break;
          }
        }
        const strUserGet = async () => {
          const strUseremail = await strSession;
          this.UserLoggedIn = strUseremail;
          this.strWelcome = "Welcome"
        }
        if (location.pathname == "/profile") {
          //If not in the profile page, don't get the current user
        }
        else {
          strUserGet();
        }
    }
  }



}

