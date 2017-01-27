/**
 * Created by Knut on 27.01.2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {FravaerService} from '../_services/fravaer.service';
import {Fravaer} from '../_models/fravaer'
/*var $ = require("jquery");*/

@Component({
  moduleId: module.id,
  selector: 'my-fravaer-info',
  templateUrl: 'fravaer-info.component.html',
  styleUrls: ['fravaer-info.component.css']
})

export class FravaerInfoComponent implements OnInit {
  user:User;
  users:User[];
  fraUser:User;
  fravaer:Fravaer;
  fravaers :Fravaer[];

  constructor(private fravaerService:FravaerService,
              private userService:UserService) {
  }


  ngOnInit():void {
    this.user = this.userService.getCurrentUser();
    this.fravaerService.getFravaerliste().then(fravaers => this.fravaers = fravaers);
    this.userService.getUsers().then(users => this.users = users);
    this.fravaer = new Fravaer();
    console.log("yo yo " + this.fravaers);
  }
  selectUser(id : number){
    for (let u of this.users) {
      if (u.brukerId == id) {
        this.fraUser = u;
        // console.log(u);
      }
    }
  }
}
