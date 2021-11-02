# okta-Dashboard-1
Okta org overview dashboard

<img src="/Capture.PNG" alt="drawing" width="600"/>
<img src="/Capture2.PNG" alt="drawing" width="600"/>
<img src="/Capture3.PNG" alt="drawing" width="600"/>
<img src="/Capture4.PNG" alt="drawing" width="600"/>
<img src="/Capture5.PNG" alt="drawing" width="600"/>
<img src="/Capture6.PNG" alt="drawing" width="600"/>
<img src="/Capture7.PNG" alt="drawing" width="600"/>
<img src="/Capture8.PNG" alt="drawing" width="600"/>

**Please note this is NOT an official Okta tool, and the Okta support team WILL NOT provide support for this.**



## What does this tool do?

* This is a simple dashboard the shows the Okta org statistics.
* Uses an OpenID Connect access token to retrieve data from the Okta org
* A service runs on a periodic basis to check the validity of the access token, and if the access token is found to be invalid, the user will be forced to re-authenticate.

## Okta OIDC application configuration 

## Required Scopes and claims
In the OIDC application, the below scopes need to be configured in order to download the required data to display on the screen.


## Rate Limits

## Development Environment
```
Angular CLI: 11.2.14
Node: 14.15.0
OS: linux x64

Angular: 11.2.14
... animations, cli, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1102.14
@angular-devkit/build-angular   0.1102.14
@angular-devkit/core            11.2.14
@angular-devkit/schematics      11.2.14
@angular/cdk                    11.2.13
@angular/flex-layout            12.0.0-beta.34
@angular/material               11.2.13
@schematics/angular             11.2.14
@schematics/update              0.1102.14
rxjs                            6.6.7
typescript                      4.1.6

```

## How to run this tool
- In a directory of your choice,

- Clone the repo,

- Enter the directory,

- Install pakackages

`npm install`
- Run the tool

`ng serve`
- Open the tool

`http://localhost:4200`

- The below file is used to hold the Okta condfigurations for the application.
`src/app/shared/okta-config.ts`

- The below sample has been included, which you can edit and rename to "okta-config.ts" prior to running your own instance of this application.
`src/app/shared/sample-okta-config.ts`

- Inside the files, the below section will need to be updated with your setting.

```
 strBaseURI = '{{Base URI}}';  
 strRedirectURL = '{{Redirect URI}}';
 strClientID = '{{Client ID}}';
 strIssuer = '{{Issuer URI}}';  /// This must be the Org URL ////
 strPostLogoutURL = '{{Redirect URI}}';
 strScope = ['openid', 'email', 'profile','address'];
 strResponseType = ['token','id_token'];
 strResponseMode = 'fragment';
 strPrompt = ['consent','login'];
 strPkce = false;
 strLang = '{{Language code}}';
 strBrand =  '{{Colour}}';
 strLogo = '{{Logo URL}}';
 strPortalAddress = '{{Portal address}}';

```

**WARNING
Please note, the issuer URL is the org URL and not the authorisation server URL.**




