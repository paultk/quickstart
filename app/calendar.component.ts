import {Component, Input, OnInit} from "@angular/core";
import {User} from "./user";
import {Shift} from "./shift";
import {ShiftService} from "./shift.service";
import {UserService} from "./user.service";

//todo: possibly fix the way percentage of workers handles shift display
//todo: Alphabetize users displayed
//todo: change shifts




@Component({
  moduleId: module.id,
  selector: 'calendar-component',
  templateUrl: 'calendar.component.html',
  styleUrls: [ 'calendar.component.css']
})

export class CalendarComponent implements OnInit {
  constructor(
    private shiftService: ShiftService,
    private userService: UserService
  ) {
  }




  //  list of shifts that are in the system
  takenShift: Shift[];
  //  list of users that can work that day, with from and to time
  shiftsUsersCanWork: Shift[];

  shiftInForm: Shift;

  date: Date;

  allUsers: User[] = [];


  tempArr = new Array(25);

  months = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

  shifts: Shift[] = [
    new Shift(null, null, null, 1),
    new Shift(null, null, null, 2),

  ];

  restOfInit(): void {




    console.log('sd');
    this.allUsers.forEach(user => console.log('ping'));

    /*this.allUsers.forEach( user =>
      this.dynamicList[user.brukerId] = [Math.round( (37.5 * daysInMonth / 7 ) * (user.stillingsProsent / 100))]);
    // user.stillingsProsent / 100 * daysInMonth * 8), 0, user.stillingsProsent]);*/

    // todo: possibly fix the workaround for amount of hours a month


    // this.shifts.forEach(shift => console.log(shift));
    // for (let i in this.dynamicList) {
    //   console.log(this.dynamicList[i]);
    // }

    /*this.shifts.map(
     shift => this.dynamicList[shift.userId][0] += -8
     );*/
    /*
     for (let j in this.dynamicList) {
     console.log(this.dynamicList[j]);

     }

     // loop to display ordinary time, or overtime
     for (let i in this.dynamicList) {
     if(this.dynamicList[i][0] < 0) {
     this.dynamicList[i][1] = this.dynamicList[i][0] * -1;
     this.dynamicList[i][0] = 0;

     }
     }*/

  }


  ngOnInit(): void {

    this.date = new Date();

    let daysInMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();


    this.getAllUsers();
    // this.restOfInit();

    // this.takenShift = this.shiftService.getShifts(new Date(1221));
    // this.shiftsUsersCanWork = this.shiftService.getShiftsUsersCanWork(null);
    // this.shiftInForm = this.shiftsUsersCanWork[0];




  }


  setForm(user: User): void {
    console.log(user);
    this.shiftInForm.user = user;
  }

  setTakenShiftDisplay(date: Date): void {
    for (let i in this.shifts) {
      //todo: fix if
      if(this.shifts[i].fromTime == this.date.getDate()) {
        // 0: 2300-0700, 1: 0700-1500, 2: 1500-2300
        // todo: fix shift time handling, changes on db would make it easier
        let shiftTime = 1;
        this.percentageList[shiftTime][this.dynamicList[this.shifts[i].userId].stillingsId] += 1;

      }
    }
  }


  testIfPercentageIsOk(): void {
    for(let i = 0; i < 3; i++) {
      let total: number;
      for (let j = 0; i < 3; j++) {
        total += this.percentageList[i][j];
      }
      if (total <= 0) return;
      else {
        this.shiftPercentageOk[i] = ((this.percentageList[i][0] / total) >= 0.3 && (this.percentageList[i][0] / total) >= 0.2)
      }
    }
  }



  dynamicList = {};
  // 0 = HelsefagArbeider(30 %), 1 = Sykepleier(20%), 2 = Assistent
  // Three shifts a day
  percentageList = [[0,0,0], [0,0,0], [0,0,0]];
  shiftPercentageOk = [false, false, false];

  //todo: possibly limit getUsers to avdeling
  // sets all the users from the db
  getAllUsers(): void {
    /*this.userService.getUsers5().subscribe(
      res => console.log(res)
    );*/
    /*this.userService.getUsers3().subscribe(array => this.allUsers = array,
      err => console.log(err),
      () => console.log("Completed")
    )*/

    /*this.allUsers = await Promise.resolve(this.userService.getUsers());
    this.allUsers = this.userService.getUsers2();
*/
    // .then(res => this.allUsers = res)
    // .then(() => setTimeout( () =>
    // this.allUsers.forEach( user => console.log(user)), 2000

    // .then(() => setTimeout(this.restOfInit(), 100))
    // .catch((error) => console.log(error)));
    // console.log(this.allUsers[0]);
    // setTimeout(() =>     console.log(this.allUsers[0]), 3000);

    let a = this.userService.getUsers();
    Promise.resolve(a).then(e => this.allUsers = e).then(
      () =>
    setTimeout(this.restOfInit, 6000));
    /*
    this.userService.getUsers().then(
      (users) => setTimeout(users => this.allUsers = Promise.resolve(users), 1000)
    ).then(
      () => setTimeout(this.restOfInit, 3000)
    )*/
  }


  setUsers(): void {
    console.log(this.allUsers);






    // USERS.map(user => console.log(dynamicList[user.brukerId]));


    // console.log(jsonUsers);

    // allUsers.map(user => console.log(user.brukerId));
    /*
     this.takenShift.forEach(shift =>

     dynamicList['tempUser1'] = ('tempUser1');


     );*/


    // let tempUser: User;
    // let percentageUser = tempUser.stillingsProsent;

  }

}
