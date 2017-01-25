import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './user';
import {Authentication} from "./authentication";
import {Http, Headers} from "@angular/http";
import {Token} from "./Token";
import {AuthenticationService} from "./authentication.service";

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})

export class LoginComponent implements OnInit {
  model = new Authentication("dummy", "dummy");
  rememberMe = false;
  loading = false;
  returnUrl: string;

  constructor(
    private http: Http,
    private authService: AuthenticationService,
    private router: Router
  ){}

  private headers = new Headers({'Content-Type': 'application/json'});



  login() {
    this.loading = true;
    this.authService.login(this.model)
      .subscribe(
        data => {
          console.log("success");
          this.authService.setCurrentUser(localStorage.getItem('currentUserEmail'));
          //this.goToNavigation();
        },
        error => {
          this.loading = false;
          console.log("failure: " + error);
        });

    //this.authService.login2(this.model)
  }

  goToNavigation() {
    this.router.navigate(['/navigation']);
  }



  onSubmit(): void {
    console.log("Boop");
    this.login();
    console.log(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}
}
