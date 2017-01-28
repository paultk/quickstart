/**
 * Created by Trym Todalshaug on 12/01/2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
/*var $ = require("jquery");*/

@Component({
  moduleId: module.id,
  selector: 'my-userinfo',
  templateUrl: 'userinfo.component.html',
  styleUrls: ['userinfo.component.css']
})

export class UserinfoComponent implements OnInit{

  users: User[];
  selectedUser: User;
  edited = false;

  constructor (
    private userService: UserService
  ) {}

  onSelect(idNum: number): void{
    console.log('onSelect() ' + idNum);
    for (let u of this.users){
      if(u.brukerId ==idNum){
        this.selectedUser=u;
        console.log(u);
      }
    }

  }

  slett(user: User): void {
    this.userService.delete(user).subscribe(ret => {
      this.getUsers();
    });
    //setTimeout(this.getUsers(), 2000);
    /*setTimeout(function(){
      this.clearText();
    }.bind(this), 100);

    this.updateMessages();

    this.edited = true;
    //wait 3 Seconds and hide
    setTimeout(function() {
      this.edited2 = false;
      console.log(this.edited);
    }.bind(this), 3000);*/
  }

  /*updateUsers() {
    this.userService.getUsers().then(users => this.users = users);
  }*/

  getUsers(): void {
    let response = this.userService.getUsers();
    Promise.resolve(response).then(users => this.users = users).then(() => console.log(this.users));
  }

  ngOnInit(): void {
    this.getUsers();
  }



  // Change the selector if needed
  /*var $table = $('table.users');
  var $bodyCells = $table.find('tbody tr:first').children();
  colWidth: number;

  // Adjust the width of thead cells when window resizes
  $(window).resize(function() {
    // Get the tbody columns width array
    colWidth = $bodyCells.map(function() {
      return $(this).width();
    }).get();

    // Set the width of thead columns
    $table.find('thead tr').children().each(function(i, v) {
      $(v).width(colWidth[i]);
    });
  }).resize(); // Trigger resize handler*/
}
