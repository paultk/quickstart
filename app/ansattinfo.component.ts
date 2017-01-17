/**
 * Created by Trym Todalshaug on 12/01/2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from './user';
import {UserService} from './user.service';

@Component({
  moduleId: module.id,
  selector: 'my-ansattinfo',
  templateUrl: 'ansattinfo.component.html',
  styleUrls: ['ansattinfo.component.css']
})

export class AnsattinfoComponent implements OnInit{
  users: User[];
  selectedUser: User;

  constructor (
    private userService: UserService,
  ) {}

  getUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
  }

  ngOnInit(): void {
    this.userService.getUsers();
  }
}
