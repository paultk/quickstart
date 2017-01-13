import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {User} from "./user";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(
    private http: Http
  ){}

  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  addUser(user: User): void {
    const URL = 'localhost:8080/bruker/add';
    console.log("from userService");
    this.http
      .post(URL, JSON.stringify(user), {headers: this.headers},)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }



}
