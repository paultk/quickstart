/**
 * Created by Trym Todalshaug on 18/01/2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {AuthenticationService} from "../_services/authentication.service";

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
  visible: boolean;

  private headers = new Headers({'Content-Type': 'application/json', 'token': localStorage.getItem('sessionToken')});


  constructor (
    private userService: UserService,
    private http: Http,
    private router: Router,
    private authService: AuthenticationService
) {}

  getUsers(): void {
    // this.userService.getUsers().then(users => this.users = users);
  }

  /*goToCalendar() {
    this.router.navigate(['/calendar']);
  }*/

  setNumMessages(): void {
    this.selectedUser = this.userService.getCurrentUser();
    const URL = 'http://localhost:8080/melding/get/ulest/ant';
    this.http.post(URL, JSON.stringify(this.selectedUser), {headers: this.headers},)
      .toPromise()
      .then((res) => {
        this.numMessages = parseInt(res.text());
        if (this.numMessages > 0) {
          this.visible = true;
        }
        else {
          this.visible = false;
        }
        // console.log(this.numMessages);
    })
      .catch((res) => {
        console.log(res);
    })
  }

  ngOnInit(): void {
    this.getUsers();
    this.selectedUser = this.userService.getCurrentUser();
    console.log(this.selectedUser);
    this.setNumMessages();
    setInterval(() => {this.setNumMessages();}, 2000);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
