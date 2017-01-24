/**
 * Created by Trym Todalshaug on 18/01/2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from './user';
import {UserService} from './user.service';

@Component({
  moduleId: module.id,
  selector: 'my-navigation',
  templateUrl: 'navigation.component.html',
  styleUrls: ['navigation.component.css']
})

export class NavigationComponent implements OnInit{
  users: User[];
  selectedUser: User;

  constructor (
    private userService: UserService
  ) {}

  getUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
