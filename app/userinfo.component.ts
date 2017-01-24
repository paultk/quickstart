/**
 * Created by Trym Todalshaug on 12/01/2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from './user';
import {UserService} from './user.service';

@Component({
  moduleId: module.id,
  selector: 'my-userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.css']
})

export class UserinfoComponent implements OnInit{
  users: User[];
  selectedUser: User;

  constructor (
    private userService: UserService
  ) {}

  getUsers(): void {
    let response = this.userService.getUsers();
    Promise.resolve(response).then(users => this.users = users).then(() => console.log(this.users));
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
