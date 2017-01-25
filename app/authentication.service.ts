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
    const URL = `http://localhost:8080/login`;
    return this.http
      .post(URL, JSON.stringify(auth), {headers: this.headers})
      .map((response: Response) => {
        let re = /@/gi;
        let str = auth.username.replace(re, "%40");
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

  setCurrentUser(email: string): void {
    const URL = `http://localhost:8080/bruker/epost/${email}`;
    let returnPromise: User[] = [];
    let as: Object[] = [];

    console.log("yoooooooooooooo");

    this.http.get(URL).toPromise().then(response =>
      as = (JSON.parse(response['_body'])))
      .then(
        () =>
          as.forEach(user =>
            returnPromise.push(new User(user['brukerId'], user['passordId'], user['stillingsBeskrivelse'], user['telefonNr'],
              user['stillingsProsent'], user['timelonn'], user['admin'], user['fornavn'], user['etternavn'],
              user['epost'], user['avdelingId'], user['plaintextPassord'], user['fodselsdato'], user['adresse'],
              user['by'], user['hash'], user['salt']))

          )).catch(this.handleError);

    let response = Promise.resolve(returnPromise);

    Promise.resolve(response).then(res => {
      localStorage.setItem('currentUser', JSON.stringify(res));
    });
  }
}
