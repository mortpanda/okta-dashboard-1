import { Component, OnInit } from '@angular/core';
import { OktausersdownloadService } from 'app/shared/okta/oktausersdownload.service';
import { OktagroupsdownloadService } from 'app/shared/okta/oktagroupsdownload.service';
import { OktaappsdownloadService } from 'app/shared/okta/oktaappsdownload.service';
import { OktaConfig } from "app/shared/okta/okta-config";
import { OktafactorsService } from 'app/shared/okta/oktafactors.service';

@Component({
  selector: 'app-dataload',
  templateUrl: './dataload.component.html',
  styleUrls: ['./dataload.component.css']
})
export class DataloadComponent implements OnInit {
  strDownloadeditem;
  strDownloadStatus;
  strHeading;


  constructor(private OktaConfig: OktaConfig, private OktausersdownloadService: OktausersdownloadService, private OktagroupsdownloadService: OktagroupsdownloadService
    , private OktaappsdownloadService: OktaappsdownloadService, private OktafactorsService: OktafactorsService) { }

  async ngOnInit() {
    document.getElementById("btn-close").style.visibility = "hidden";
    this.strDownloadeditem = '';
    this.strDownloadStatus = '';
    this.strHeading = 'Downloading Data Please Wait...';

    this.strDownloadStatus = 'Downloading.....';
    this.strDownloadeditem = 'Downloading application data from the org.....';
    console.log('Download apps');
    await this.OktaappsdownloadService.GetApps();
    this.strDownloadeditem = '';

    this.strDownloadeditem = 'Downloading group data from the org.....';
    console.log('Download groups');
    await this.OktagroupsdownloadService.GetGroups();
    this.strDownloadeditem = '';

    this.strDownloadeditem = 'Downloading user data from the org.....';
    console.log('Download users');
    await this.OktausersdownloadService.GetUsers()

    this.strDownloadeditem = 'Downloading MFA data from the org.....';
    console.log('Download users');
    await this.OktafactorsService.GetMFA();

    
    document.getElementById("progress").style.visibility = "hidden";
    document.getElementById("btn-close").style.visibility = "visible";
    this.strDownloadStatus = '';
    this.strDownloadStatus = 'Completed!!';
    this.strDownloadeditem = 'Download completed, please close this dialog';
    this.strHeading = '';
    this.strHeading = 'Completed!!';
  }

  GotoDash(){
    window.location.replace(this.OktaConfig.strRedirectURL);
    // location.reload();

  }

}

