# ciam-angular-portal-profile
Japanese CIAM Demo Portal Site

<img src="/Capture2.PNG" alt="drawing" width="600"/>
<img src="/Capture.PNG" alt="drawing" width="600"/>

**Please note this is NOT an official Okta tool, and the Okta support team does NOT provide support for this.**
This is merely a personal projct, and NOT supported by Okta's support team.


## What does this tool do?
This website is a simple demo portal site, which contains links to external sites, and can be used to demo Single Sign-On using OIDC.
There are 3 x groups in the org that determine the links that get displayed on the portal.


**ANGULAR-CIAM-DEMO-PORTAL-WORDPRESS** - If the user is a member of this group, a link will be displayed to a member-only CMS.

**ANGULAR-CIAM-DEMO-PORTAL-WORDPRESS-BB** - If the user is a member of this group, a link will be displayed to a member-only bulletin board.

**ANGULAR-CIAM-DEMO-PORTAL-MOODLE** - If the user is a member of this group, a link will be displayed to an online learning site.

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
 strIssuer = '{{Issuer URI}}';
 strPostLogoutURL = '{{Redirect URI}}';
 strScope = ['openid', 'email', 'profile','address'];
 strResponseType = ['token','id_token'];
 strResponseMode = 'fragment';
 strPrompt = ['consent','login'];
 strPkce = false;
 strLang = '{{Language code}}';
 strBrand =  '{{Colour}}';
 strLogo = '{{Logo URL}}';
 strMFAClientID = '{{}}';
 strPortalAddress = '{{Portal address}}';

```




