import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {Authentication} from "./authentication";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {}

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  login(email: string, password: string) {
    const URL = `http://localhost:8080/login`;
    return this.http
      .post(URL, JSON.stringify(new Authentication(email, password)))
      .map((response: Response) => {
        let user = response.json();
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
