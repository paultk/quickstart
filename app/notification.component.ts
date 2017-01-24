import {Component, OnInit} from "@angular/core";

import {User} from './user';
import {UserService} from './user.service';

@Component({
  moduleId: module.id,
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css']
})

export class NotificationComponent implements OnInit {
  user: User;
  selectedUser: User;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }
}
