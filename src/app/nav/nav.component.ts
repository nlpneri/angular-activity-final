import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deepEqual } from 'assert';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged: boolean;
  constructor(private services: GlobalService, private router: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.services.checkLogStatus();

    this.services.isLogged.subscribe((response: any) =>{

        this.isLogged = response;

    });

  }

  logout(){
    this.services.deleteToken();
    this.router.navigate(['/login']);
  }

}
