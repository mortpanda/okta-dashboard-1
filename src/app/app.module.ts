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
import { PortalComponent } from './portal/portal.component';
import { PortalDisplaypageComponent } from './portal-displaypage/portal-displaypage.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OktaAuthModule } from '@okta/okta-angular';
import { WhoisoktaComponent } from './whoisokta/whoisokta.component';
import { SdkLoginComponent } from './sdk-login/sdk-login.component';

import { EnLoginPageComponent } from './en-login-page/en-login-page.component';
import { EnSdkLoginComponent } from './en-sdk-login/en-sdk-login.component';
import { EnFooterComponent } from './shared/en-footer/en-footer.component';
import { EnWhoisoktaComponent } from './en-whoisokta/en-whoisokta.component';
import { EnPortalDisplaypageComponent } from './en-portal-displaypage/en-portal-displaypage.component';
import { EnPortalComponent } from './en-portal/en-portal.component';
import { UsersGroupsComponent } from './users-groups/users-groups.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfigModalComponent } from './config-modal/config-modal.component'; 
import {CookieService} from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PortalComponent,
    PortalDisplaypageComponent,
    LoginPageComponent,
    WhoisoktaComponent,
    SdkLoginComponent,
    EnLoginPageComponent,
    EnSdkLoginComponent,
    EnFooterComponent,
    EnWhoisoktaComponent,
    EnPortalDisplaypageComponent,
    EnPortalComponent,
    UsersGroupsComponent,
    DashboardComponent,
    ConfigModalComponent,
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    //ExamplesModule,
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
    MatSelectModule

  ],
  providers: [OktaSDKAuthService,CookieService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
