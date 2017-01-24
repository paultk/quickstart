/**
 * Created by Jens on 24-Jan-17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Notification} from "./notification";
import 'rxjs/add/operator/toPromise';
import {JsonTestClass} from "./json-test-class";
import {User} from "./user";
import {Fravaer} from "./fravaer";
// import {USERS} from './mock-ansatte';

@Injectable()
export class NotificationService {
  private NotificationURL = 'http://localhost:8080/melding';

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

  addNotification(notification : Notification): void {
    const URL = 'http://localhost:8080/melding/add';
    console.log("from notificationService");
    this.http
      .post(URL, JSON.stringify(notification), {headers: this.headers},)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  getNotifications(user : User): Promise<Fravaer[]> {
    const URL = 'http://localhost:8080/melding/get';
    console.log("from notificationService");
    return this.http
      .post(URL, JSON.stringify(user), {headers: this.headers},)
      .toPromise()
      .then(res => res.json().data as Notification[])
      .catch(this.handleError)
  }

  //      .then(res => res.json().data as Fravaer[])



  /*
   getUsers(): Promise<User[]> {
   return this.http.get(this.UsersURL).toPromise().then(response => response.json().data as User[]).catch(this.handleError)
   }
   */

  /*getNotification(id: number): Promise<User> {
    return this.getUsers().then(users => users.find(user => user.brukerId === id));
  }*/

  /*Brukes i profil.component.ts*/
  getCurrentUser(): User {
    return new User(1, 1, 1, 41414141, 100, 200, false, 'Mr. Nice', 'Johnson', 'narco@minvakt.no', 1, 'passord1234', '01.01.2016', 'veigata 5', 'Trondheim');
  }

}
