import {Component, OnInit} from "@angular/core";

import {User} from './user';
import {UserService} from './user.service';
import {Notification} from './notification';
import {NotificationService} from './notification.service';

@Component({
  moduleId: module.id,
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css']
})

export class NotificationComponent implements OnInit {
  user: User;
  users : User[];
  notification : Notification;
  notifications : Notification[];

  constructor(
    private notifService : NotificationService,
    private userService : UserService
  ) {}

  createMessage(header : string, message : string, toUser : number, fromUser : number): void {
    let not = new Notification(0, toUser, fromUser, header, message, '1999-01-01', false);
    this.notifService.addNotification(not);
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.notifService.getNotifications(this.user).then(notifications => this.notifications = notifications);
    this.userService.getUsers().then(users => this.users = users);
    //    this.userService.getUsers().then(users => this.users = users);

  }
}
