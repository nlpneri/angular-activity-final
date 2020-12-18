import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLogged: boolean;
  constructor(private services: GlobalService, private router: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {

    this.services.isLogged.subscribe((response: any) =>{
      setTimeout(() => {
        this.isLogged = response;
      },10);
    });
  }

}
