// import { Injectable } from '@angular/core';
// import { OktaConfig } from "app/shared/okta/okta-config";

// @Injectable({
//     providedIn: 'root'
// })
// export class OktaAPIGet {
//     constructor(private OktaConfig: OktaConfig) { }

//     async FunctionGetUserCount(strUserCountURL, myToken) {

//         var strUserType;
//         console.log('Calling... : ' + strUserCountURL);
//         /////////////////////////////////////
//         // Set output test depending on the URL
//         switch (strUserCountURL) {
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strProvisionedUsersFilter:
//                 strUserType = "Provisioned Users : "
//                 break;
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strActiveUserFilter:
//                 strUserType = "Active Users : "
//                 break;
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strRecoveryUserFilter:
//                 strUserType = "Recovery Users : "
//                 break;
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strPWExpiredFilter:
//                 strUserType = "Password Expired Users : "
//                 break;
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strLockedOutFilter:
//                 strUserType = "Locked Out Users : "
//                 break;
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strSuspendedFilter:
//                 strUserType = "Suspended Users : "
//                 break;
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strProvisionedUsersFilter:
//                 strUserType = "Provisioned Users : "
//                 break;
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strStagedUsersFilter:
//                 strUserType = "Staged Users : "
//                 break;
//             case this.OktaConfig.strBaseURI + this.OktaConfig.strDeprovisionedFilter:
//                 strUserType = "Deprovisioned Users : "
//                 break;

//         }
//         //myToken = this.strAccessToken;
//         /////////////////////////////////////
//         async function fetchRequest(url) {
//             try {
//                 // Fetch request and parse as JSON
//                 const response = await fetch(url, {
//                     headers: new Headers({
//                         'Authorization': 'Bearer ' + myToken,
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     })
//                 });

//                 let data = await response.json();
//                 // Extract the url of the response's "next" relational Link header
//                 let next_page;
//                 if (/<([^>]+)>; rel="next"/g.test(response.headers.get("link"))) {
//                     next_page = /<([^>]+)>; rel="next"/g.exec(response.headers.get("link"))[1];
//                 }

//                 // If another page exists, merge its output into the array recursively
//                 if (next_page) {
//                     data = data.concat(await fetchRequest(next_page));
//                 }
//                 return data;
//             } catch (err) {
//                 return console.error(err);
//             }
//         }
//     }
// }




