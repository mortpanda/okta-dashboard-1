import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';


//import { ExamplesModule } from './examples/examples.module';
import { OktaSDKAuthService } from 'app/shared/okta/okta-auth-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Material UI stuff
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import { Router, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {A11yModule} from '@angular/cdk/a11y';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatCheckboxModule} from '@angular/material/checkbox';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoginPageComponent } from './login-page/login-page.component';
import { OktaAuthModule } from '@okta/okta-angular';
import { WhoisoktaComponent } from './whoisokta/whoisokta.component';
import { SdkLoginComponent } from './sdk-login/sdk-login.component';

import { EnFooterComponent } from './shared/en-footer/en-footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import {CookieService} from 'ngx-cookie-service';

import { DashboardDisplayPageComponent } from './dashboard-display-page/dashboard-display-page.component';
import { ChartsModule } from 'ng2-charts';
import { ActiveusersComponent } from './activeusers/activeusers.component';
import { InactiveusersComponent } from './inactiveusers/inactiveusers.component';
import { UsertypeComponent } from 'app/usertype/usertype.component';
import { ListgroupsComponent } from './listgroups/listgroups.component';
import { ListgroupmembercountComponent } from './listgroupmembercount/listgroupmembercount.component';
import { AdmingroupsComponent } from './admingroups/admingroups.component';
import { AppstatusComponent } from './appstatus/appstatus.component';
import { OktaChecktokenService } from 'app/shared/okta/okta-checktoken.service';
import { TokenexpireComponent } from './tokenexpire/tokenexpire.component';
import { DataloadComponent } from './dataload/dataload.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AppsignonComponent } from './appsignon/appsignon.component';
import { AppfeatureComponent } from './appfeature/appfeature.component';
import { AppdetailsComponent } from './appdetails/appdetails.component';
import { GrouptypeComponent } from './grouptype/grouptype.component';
import { MfafactorsComponent } from 'app/mfafactors/mfafactors.component';
import { MfafactortypeComponent } from 'app/mfafactortype/mfafactortype.component';
import { MfaproviderComponent } from 'app/mfaprovider/mfaprovider.component';
import { HelpmodalComponent } from './helpmodal/helpmodal.component';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginPageComponent,
    WhoisoktaComponent,
    SdkLoginComponent,
    EnFooterComponent,
    DashboardComponent,
    DashboardDisplayPageComponent,
    ActiveusersComponent,
    InactiveusersComponent,
    UsertypeComponent,
    ListgroupsComponent,
    ListgroupmembercountComponent,
    AdmingroupsComponent,
    AppstatusComponent,
    TokenexpireComponent,
    DataloadComponent,
    AppsignonComponent,
    AppfeatureComponent,
    AppdetailsComponent,
    GrouptypeComponent,
    MfafactorsComponent,
    MfafactortypeComponent,
    MfaproviderComponent,
    HelpmodalComponent,
     
    
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule, 
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    A11yModule,
    FlexLayoutModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSnackBarModule,
    HttpClientModule,
    OktaAuthModule,
    MatSelectModule,
    ChartsModule,
    MatProgressBarModule,
    MatListModule,
    
  ],
  providers: [
    OktaSDKAuthService,
    CookieService,
    ActiveusersComponent,
    InactiveusersComponent,
    ChartsModule,
    AppstatusComponent,
    OktaChecktokenService,
    DataloadComponent,
    ], 


  bootstrap: [AppComponent]
})
export class AppModule { }
