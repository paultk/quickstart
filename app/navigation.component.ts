/**
 * Created by Trym Todalshaug on 18/01/2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from './user';
import {UserService} from './user.service';
import {Http, Headers} from "@angular/http";

@Component({
  moduleId: module.id,
  selector: 'my-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})

export class NavigationComponent implements OnInit{
  users: User[];
  selectedUser: User;
  numMessages = 0;

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor (
    private userService: UserService,
    private http: Http,
) {}

  getUsers(): void {
    // this.userService.getUsers().then(users => this.users = users);
  }

  setNumMessages(): void {
    this.selectedUser = this.userService.getCurrentUser();
    const URL = 'http://localhost:8080/melding/get/ulest/ant';
    console.log("from navigation.component.setNumMessages()");
    this.http.post(URL, JSON.stringify(this.selectedUser), {headers: this.headers},)
      .toPromise()
      .then((res) => {
        this.numMessages = parseInt(res.text());
        console.log(this.numMessages);})
      .catch((res) => {
        console.log(res);
    })
  }

  ngOnInit(): void {
    this.getUsers();
    this.selectedUser = this.userService.getCurrentUser();
    setInterval(() => {
      this.setNumMessages();
    }, 2000);
  }
}
