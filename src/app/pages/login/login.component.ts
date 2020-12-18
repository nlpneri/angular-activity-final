import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import Swal from 'sweetalert2'
import { Login } from './login-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  isLogged: boolean;
  login = {
    username: '',
    password: ''
  } as Login

  constructor(private services: GlobalService, private router: Router) { }

  ngOnInit(): void {
    var redir = this.services.checkLogStatus();

    if(redir){
      this.router.navigate(['/']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    });

  }

  onLogin()
  {
    if(this.loginForm.valid)
    {
      const formValues = this.loginForm.value;

      this.login = {
        username: formValues.username,
        password: formValues.password
      };

      this.services.httpLogin(this.login);

      this.services.onHttpLogin.subscribe((response:any) =>{
        const token = response.token;
        this.services.setToken(token);
        setTimeout(()=>{
          if(response.status = 'success'){
            Swal.fire({
            title: 'Logged In Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
            });
            this.router.navigate(['/']);
          }
        }, 10);
      },
      (error) =>{
        Swal.fire({
          title: error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    }
    else{
      Swal.fire({
        title: 'Form field required!',
        text: 'Please Complete all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

}
