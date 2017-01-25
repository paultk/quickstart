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
  user : User;
  fraUser : User;
  users : User[];
  model = new Notification(0,0,0,"test", "test", "1999-01-01", false);
  notification : Notification;
  notifications : Notification[];
  // submitted = false;

  constructor(
    private notifService : NotificationService,
    private userService : UserService
  ) {}

  selectUser(id : number){
    for (let u of this.users) {
      if (u.brukerId == id) {
        this.fraUser = u;
        console.log(u);
      }
    }
  }

  onSubmit() {
    this.model.fraBrukerId = this.user.brukerId;
    console.log(this.model);
    // this.submitted = true;
    this.notifService.addNotification(this.model);
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.notifService.getNotifications(this.user).then(notifications => this.notifications = notifications);
    this.userService.getUsers().then(users => this.users = users);
    //    this.userService.getUsers().then(users => this.users = users);
  }


}
