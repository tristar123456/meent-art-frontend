import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AuthService} from '../providers/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = new FormControl();
  password = new FormControl();


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  performLogin() {
    this.authService.authenticate(
      this.username.value,
      this.password.value
    ).then(() => {
      this.router.navigate(['']);
    }, error => {
      this.warn();
    });
  }
  checkLogin(): boolean{
    return this.authService.isLoggedIn();
  }

  private warn() {
    this.username.setErrors(Validators.required);
    this.password.setErrors(Validators.required);
  }
}
