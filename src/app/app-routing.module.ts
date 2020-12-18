import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';

import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';



const routes: Routes = [
  { path : '', component: PagesComponent, children: [
    { path : '', component: HomeComponent, children: [
      { path : '', component: LandingComponent },
      { path : 'my-profile', component: MyProfileComponent }

    ] },
    { path : 'about-us', component: AboutComponent },
    { path : 'login', component: LoginComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
