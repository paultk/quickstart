/**
 * Created by Trym Todalshaug on 16/01/2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from './user';
import {UserService} from './user.service';

@Component({
  moduleId: module.id,
  selector: 'my-profil',
  templateUrl: 'profil.component.html',
  styleUrls: ['profil.component.css']
})

export class ProfilComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(
    private userService: UserService,
  ) {}

  getUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
