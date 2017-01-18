import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {User} from "./user";
import 'rxjs/add/operator/toPromise';
import {JsonTestClass} from "./json-test-class";
import {USERS} from './mock-ansatte';

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

  testConnect2(jsonTest: JsonTestClass): void {
    this.http
      .post('http://localhost:8080/test/json', JSON.stringify(jsonTest), {headers: this.headers},)
      .toPromise()
      .then(res => console.log(res))
      .catch(this.handleError);
  }

  testConnect(): void {
    console.log('ping');
    this.http
      .get('http://localhost:8080/test',)
      .toPromise()
      .then(res => console.log(res))
      .catch(this.handleError);
  }

  addUser(user: User): void {
    const URL = 'http://localhost:8080/bruker/add';
    console.log("from userService");
    this.http
      .post(URL, JSON.stringify(user), {headers: this.headers},)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(USERS);
  }

  getUser(id: number): Promise<User> {
    return this.getUsers().then(users => users.find(user => user.id === id));
  }

  getCurrentUser(): User {
    return new User('narco@minvakt.no', 1, 'Mr. Nice', 'johnson', '01.01.2016', 41414141, 'veigata 5', 'Trondheim', 1, 100, 1, 200, false, 'passord1234');
  }

}
