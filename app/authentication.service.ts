import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {Authentication} from "./authentication";
import {User} from "./user";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  login(auth: Authentication) {
    const URL = 'http://localhost:8080/login';
    return this.http
      .post(URL, JSON.stringify(auth), {headers: this.headers})
      .map((response: Response) => {
        let re = /@/gi;
        let str = auth.username.replace(re, "&at");
        re = /\./gi;
        str = str.replace(re, "&dot");
        let responseToken = response.json();
        if (responseToken && responseToken.token) {
          localStorage.setItem('sessionToken', JSON.stringify(responseToken));
          localStorage.setItem('currentUserEmail', str);
        }
      });
  }

  logout() {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('currentUserEmail');
  }

  setCurrentUser(email: string): Promise<User[]> {
    const URL = `http://localhost:8080/bruker/epost/${email}`;
    //let users: User[] = [];
    let returnPromise: User[] = [];
    let as: Object[] = [];


    this.http.get(URL).toPromise().then(response =>
      as = (JSON.parse(response['_body'])))
      .then(
        () =>
            as.forEach( user =>
              returnPromise.push(new User(user['brukerId'], user['passordId'], user['stillingsBeskrivelse'], user['telefonNr'],
              user['stillingsProsent'], user['timelonn'], user['admin'], user['fornavn'], user['etternavn'],
              user['epost'], user['avdelingId'], user['plaintextPassord'], user['fodselsdato'], user['adresse'],
              user['by'], user['hash'], user['salt']

            )))).catch(this.handleError);

    return Promise.resolve(returnPromise);

    /*Promise.resolve(response).then(res => {
      let user: User = res;
      console.log("BRUKÆRN: " + user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    });*/

    //Promise.resolve(response).then(res => users = res).then(() => console.log(users));

    /*.then(() => {
      console.log(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log(localStorage.getItem('currentUser'));
      let test: User = JSON.parse(localStorage.getItem('currentUser'));
      console.log(test);
    });*/


  }
}
