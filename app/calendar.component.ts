import {Component, Input, OnInit} from "@angular/core";
import {User} from "./user";
import {Shift} from "./shift";
import {ShiftService} from "./shift.service";
import {USERS} from "./mock-ansatte";

//todo: possibly fix the way percentage of workers handles shift display




@Component({
  moduleId: module.id,
  selector: 'calendar-component',
  templateUrl: 'calendar.component.html',
  styleUrls: [ 'calendar.component.css']
})

export class CalendarComponent implements OnInit {
  constructor(private shiftService: ShiftService) {
  }




  //  list of shifts that are in the system
  takenShift: Shift[];
  //  list of users that can work that day, with from and to time
  shiftsUsersCanWork: Shift[];

  shiftInForm: Shift;

  date: Date;


  tempArr = new Array(25);

  months = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

  shifts: Shift[] = [
    new Shift(null, null, null, 1),
    new Shift(null, null, null, 2),

  ];

  ngOnInit(): void {

    this.takenShift = this.shiftService.getShifts(new Date(1221));
    this.shiftsUsersCanWork = this.shiftService.getShiftsUsersCanWork(null);
    this.shiftInForm = this.shiftsUsersCanWork[0];

    this.date = new Date();
    // this.date.setDate(this.date.getDate() + 1);


    let tempUser1 = new User(2);

    let allUsers: User[];

    // USERS.map(user => console.log(user.brukerId));

    let daysInMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    USERS.map(user => this.dynamicList[user.brukerId] = [Math.round(user.stillingsProsent / 100 * daysInMonth * 8), 0, user.stillingsProsent]);

    // todo: possibly fix the workaround for amount of hours a month


    this.shifts.map(
      shift => this.dynamicList[shift.userId][0] += -8
    );

    for (let j in this.dynamicList) {
      console.log(this.dynamicList[j]);

    }

    for (let i in this.dynamicList) {
      if(this.dynamicList[i][0] < 0) {
        this.dynamicList[i][1] = this.dynamicList[i][0] * -1;
        this.dynamicList[i][0] = 0;

      }
    }


  }


  setForm(shift: Shift): void {
    console.log(shift);
    this.shiftInForm = shift;
  }

  setTakenShiftDisplay(date: Date): void {
    for (let i in this.shifts) {
      //todo: fix if
      if(this.shifts[i].fromTime == this.date.getDate()) {
        this.percentageList[this.dynamicList[this.shifts[i].userId].stillingsId] += 1;

      }
    }
  }




  users: User[] = USERS;

  dynamicList = {};
  percentageList = [0,0,0];




  setUsers(): void {





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
