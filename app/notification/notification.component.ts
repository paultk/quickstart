import {Component, OnInit} from "@angular/core";

import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {Notification} from '../_models/notification';
import {NotificationService} from '../_services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.css'],

})

export class NotificationComponent implements OnInit {
  user : User;
  fraUser : User;
  users : User[];
  model = new Notification(0,0,0,"", "", "1999-01-01", false);
  notification : Notification;
  notifications : Notification[];
  tekst: string;
  // submitted = false;
  edited = false;
  edited2 = false;
  overskr: string;
  dato: string;


  constructor(
    private notifService : NotificationService,
    private userService : UserService
  ) {}

  selectUser(id : number){
    for (let u of this.users) {
      if (u.brukerId == id) {
        this.fraUser = u;
        // console.log(u);
      }
    }
  }

  onSelect(idNum: number): void{
    console.log('onSelect() ' + idNum);
    this.notifService.setLest(idNum);
    for (let u of this.notifications){
      if(u.meldingId ==idNum){
        this.notification=u;
        this.tekst = u.melding;
        this.overskr = u.overskrift;
        this.dato = u.tidSendt;
        console.log(u);
      }
    }

  }

  updateMessages() {
    this.notifService.getNotifications1(this.user).subscribe(nots => this.notifications = this.notifService.mapNotifFromObs(nots));
  }

  slett(notification: Notification): void {
    this.notifService.delete(notification);

    setTimeout(function(){
      this.clearText();
    }.bind(this), 100);

    this.updateMessages();

    this.edited2 = true;
    //wait 3 Seconds and hide
    setTimeout(function() {
      this.edited2 = false;
      console.log(this.edited);
    }.bind(this), 3000);
  }

  onSubmit() {
    this.model.fraBrukerId = this.user.brukerId;
    console.log(this.model);
    // this.submitted = true;
    this.notifService.addNotification(this.model);

    this.updateMessages();

    this.edited = true;
    //wait 3 Seconds and hide
    setTimeout(function() {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 3000);

    return this.model = new Notification(0,0,0,"", "", "1999-01-01", false);


  }

  sortMessages(): void {
    if (this.notifications != null) {
      console.log("Sortering!");
      this.notifications = this.notifications.sort(function (n1, n2) {
        return (n1.sett === n2.sett)? 0 : n1.sett? 1 : -1;
      });
      console.log(this.notifications);
    }
  }

  clearText(): void{
    this.tekst = "";
    this.overskr = "";
    this.dato="";
    //document.getElementById("test2").innerHTML= "";
  }
  updateUsers() : void {
    this.userService.getUsers1().subscribe(ret => this.users = this.userService.mapUsersFromObs(ret));
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.updateMessages();
    this.updateUsers();
    this.notification = new Notification();
    this.fraUser = new User();
    /*setInterval(() => {
      this.updateMessages();
    }, 2000);*/
    //    this.userService.getUsers().then(users => this.users = users);
  }
}
