import { Component } from '@angular/core';

import { User } from './user';
import {Authentication} from "./authentication";
import {Http, Headers} from "@angular/http";
import {Token} from "./Token";

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
  tempUser = new User(1);

  constructor(
    private http: Http
  ){}

  private headers = new Headers({'Content-Type': 'application/json'});



  /*login(email: string, password: string): void {
    if (email === this.tempUser.email && password === this.tempUser.plaintextPassord) {
      alert("Inlogging vellyket!");
    } else {
      alert("Feil brukernavn/plaintextPassord.");
    }
  }*/
  login(): void {
    let toke = new Token("lol");
    const url = "http://localhost:8080/login";
    let token = this.http.post(url, JSON.stringify(this.model), {headers: this.headers}).toPromise();
    console.log(token);
    token.then(token => toke = token);
  }

  onSubmit(): void {
    console.log("Boop");
  }
}
