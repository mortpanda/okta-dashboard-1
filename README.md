# okta-dashboard-1
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
* Auto logout after the access token expires.  The default is 1 hour.
* For org that consist of more than 200 users and groups, the tool will recursively download the users, and groups using the pagination URL.

## Required Scopes and claims
In the OIDC application, the below scopes need to be configured in order to download the required data to display on the screen.
- okta.apps.read 
- okta.factors.read 
- okta.groups.read 
- okta.users.read 

## Rate Limits
Rate limits have not been catered for, this means, if your have an org with more than 1200 users, and groups, it is likely that a rate limit warning will be displayed.

## Supported Language
- Currently in English only.

## Development Environment
```
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 11.0.4
Node: 14.15.0
OS: linux x64

Angular: 11.0.4
... animations, cli, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router
Ivy Workspace: Yes

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1100.4
@angular-devkit/build-angular   0.1100.4
@angular-devkit/core            11.0.4
@angular-devkit/schematics      11.0.4
@angular/cdk                    11.2.13
@angular/flex-layout            12.0.0-beta.35
@angular/http                   7.2.16
@angular/localize               11.2.14
@angular/material               11.2.13
@schematics/angular             11.0.4
@schematics/update              0.1100.4
rxjs                            6.6.3
typescript                      4.0.3
```

## How to run this tool
- In a directory of your choice,
- Clone the repo,
- Enter the directory,
- Install pakackages : `npm install`
- Run the tool : `ng serve`
- Open the tool : `http://localhost:4200`


## Configurations
- Information on the API enpoints - `src/app/shared/okta-config.ts`

- OIDC configuration - `src/app/shared/okta-config.ts`

- Sample configuration file - `src/app/shared/sample-okta-config.ts`

- Inside the files, the below section will need to be updated with your setting.

```
 strBaseURI = '{{Base URI}}';  
 strRedirectURL = '{{Redirect URI}}';
 strClientID = '{{Client ID}}';
 strIssuer = '{{Issuer URI}}';  /// This must be the Org URL ////
 strPostLogoutURL = '{{Redirect URI}}';
 strScope = ['openid', 'email', 'profile','okta.users.read.self',
    'okta.users.read','okta.groups.read',
    'okta.apps.read','okta.factors.read'];

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




