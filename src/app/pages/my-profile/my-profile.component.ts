import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { Profile } from './UserProfile-module';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  profileForm: any;
  profile: Profile = {
    email: '',
    firstName: '',
    lastName: '',
    alias: '',
    mobileNumber: '',
    jobTitle: '',
    password: ''
  }

  constructor(private services: GlobalService) { }

  ngOnInit(): void {

    this.services.httpGetProfile();

    this.services.onHttpGetProfile.subscribe((profile) => {
      this.fillForms(profile);
      console.log(profile);
    });


    this.profileForm = new FormGroup({
      email : new FormControl('',[Validators.required,Validators.email]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      alias: new FormControl('',[Validators.required]),
      jobTitle: new FormControl('',[Validators.required]),
      mobileNumber: new FormControl('',[Validators.required]),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });


    this.services.onHttpGetProfile.subscribe((response: any) => {
      const profile = response;

    });


  }

  fillForms(data : any): void{
    this.profileForm.patchValue({
      email: data.email,
      firstName: data.meta.first_name,
      lastName: data.meta.last_name,
      alias: data.alias,
      jobTitle: data.meta.job_title,
      mobileNumber: data.meta.mobile_number
    });
  }

  onSubmit(){
    if(this.profileForm.valid){
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.firstName,
          last_name: formValues.lastName,
          job_title: formValues.jobTitle,
          timezone: 'Asia/Manila',
          mobile_number: formValues.mobileNumber
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      }
      this.services.httpUpdateProfile(newFormValues);
    }
  }

}
