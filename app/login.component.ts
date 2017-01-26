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
  model = new Authentication("root@minvakt.no", "abcDEF!#");
  rememberMe = false;
  loading = false;
  returnUrl: string;

  theUser: User[] = [];

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

          this.authService.setCurrentUserGet(localStorage.getItem('currentUserEmail'))
            .subscribe((observable) => this.restOfSetUser(observable));
          /*console.log("success");
          let response = this.authService.setCurrentUser(localStorage.getItem('currentUserEmail'));
          Promise.resolve(response)
            .then(res => this.theUser = res)
            .then(() => console.log(this.theUser))
            .then(() => {
              for (let user of this.theUser) {
                console.log("-----------");
                console.log(user);
              }
            });

          //this.goToNavigation();*/
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

  restOfSetUser(users: User[]): void {

    console.log(users);

    this.theUser = users.map(user => new User(user['brukerId'], user['passordId'], user['stillingsBeskrivelse'], user['telefonNr'], user['stillingsProsent'],
      user['timelonn'], user['admin'], user['fornavn'], user['etternavn'], user['epost'], user['avdelingId'], user['plaintextPassord'],
      user['fodselsdato'], user['adresse'], user['by'], user['hash'], user['salt']));

    localStorage.setItem('currentUser', JSON.stringify(this.theUser));

    console.log(this.theUser);
  }


  onSubmit(): void {
    this.login();
    console.log(localStorage.getItem('currentUser'));
  }

  ngOnInit() {}
}
