import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { FormBuilder, FormControlName, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigModalComponent implements OnInit {
  private strOktaURI='';
  private strSSWSKey='';
  OrgInfo: FormGroup;


  constructor(private cookieService:CookieService,private fb: FormBuilder) { }

  async ngOnInit() {
    // this.strOktaURI=this.cookieService.get('name');   
    // console.log("cookies name " + this.strOktaURI)
     
    this.OrgInfo = this.fb.group({
      orgurl: ["", Validators.required],
      orgAPIKey: ["", Validators.required]
    });


  }

  onClose(event: any) {
    console.log(event);
  }
  


  setCookie(){
    // console.log("set")
        var orgUri =  this.OrgInfo.get("orgURL").value;
    var sswsAPI = this.OrgInfo.get("orgAPIKey").value;

    console.log(orgUri);
    console.log(sswsAPI);

    //this.cookieService.set('name','Tutorialswebsite');

  }
   
  deleteCookie(){
    this.cookieService.delete('name');
  }
   
  deleteAll(){
    this.cookieService.deleteAll();
  }


}


