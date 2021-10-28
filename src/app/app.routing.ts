import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
//import { PortalComponent } from 'app/portal/portal.component';
//import { PortalDisplaypageComponent }from 'app/portal-displaypage/portal-displaypage.component';
import { OktaAuthGuard, OktaAuthService, OktaCallbackComponent } from '@okta/okta-angular';
import { Router, RouterModule, Routes } from '@angular/router';
import { Injector, NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page/login-page.component';
// import { EnLoginPageComponent } from './en-login-page/en-login-page.component';
// import { EnPortalDisplaypageComponent } from 'app/en-portal-displaypage/en-portal-displaypage.component';

//import {DashboardComponent} from './dashboard/dashboard.component';
import { DashboardDisplayPageComponent } from './dashboard-display-page/dashboard-display-page.component';

const routes: Routes =[
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '',             component: LoginPageComponent },
    { path: 'home',         component: LoginPageComponent },
    // { path: 'en',           component: EnLoginPageComponent },  
    // { path: 'user-groups',  component: UsersGroupsComponent},
    { path: 'dashboard',  component: DashboardDisplayPageComponent},
    //{ path: 'signup',           component: SignupComponent },
    //{ path: 'landing',          component: LandingComponent },
    // { path: 'nucleoicons',      component: NucleoiconsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [RouterModule
  ],
})
export class AppRoutingModule { }
