import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { UserProfile } from './userprofile-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged: boolean;
  userProfile= {} as UserProfile;
  constructor(private services: GlobalService) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.services.checkLogStatus();
    this.services.httpGetProfile();

    if (this.services.getToken() != '') {
      this.isLogged = true
    } else {
      this.isLogged = false
    }

    this.services.onHttpGetProfile.subscribe((response: any) => {
      const profile = response;
      this.userProfile = {
        Name : profile.name,
        JobTitle : profile.meta.job_title,
        Email: profile.email,
        MobileNumber: profile.meta.mobile_number,
        Alias: profile.alias
      };
    });
  }
}
