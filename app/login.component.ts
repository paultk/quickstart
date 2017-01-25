import { Component } from '@angular/core';
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

export class LoginComponent {
  model = new Authentication("dummy", "dummy");
  loading = false;
  returnUrl: string;

  constructor(
    private http: Http,
    private authService: AuthenticationService
  ){}

  private headers = new Headers({'Content-Type': 'application/json'});



  login() {
    /*let toke = new Token("lol");
    const url = "http://localhost:8080/login";
    let token = this.http.post(url, JSON.stringify(this.model), {headers: this.headers}).toPromise();
    console.log(token);
    token.then(token => toke = token);*/

    this.loading = true;
    this.authService.login(this.model)
      .subscribe(
        data => {
          console.log("success");
        },
        error => {
          this.loading = false;
          console.log("failure: " + error);
        });
  }

  onSubmit(): void {
    console.log("Boop");
  }
}
