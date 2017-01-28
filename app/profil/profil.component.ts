/**Created by Trym Todalshaug on 16/01/2017.*/

import {Component, OnInit, Input} from "@angular/core";

import {User} from '../_models/user';
import {UserService} from '../_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'my-profil',
  templateUrl: 'profil.component.html',
  styleUrls: ['profil.component.css']
})

export class ProfilComponent implements OnInit {
  user: User;
  selectedUser: User;
  isAdmin: boolean;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.isAdmin = this.user.admin;

  }
}
