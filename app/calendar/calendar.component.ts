import {Component, Input, OnInit} from "@angular/core";
import {User} from "../_models/user";
import {Shift} from "../_models/shift";
import {ShiftService} from "../_services/shift.service";
import {UserService} from "../_services/user.service";

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

  availableHour1= '23:00:00';
  availableHour2= '07:00:00';

  availables: any[] = [];

  nullUser: User = new User(null, null, null, null, null, null, null, '', '');

  vaktForBytte1 = new Shift(this.nullUser, 0, 0);
  vaktForBytte2 = new Shift(this.nullUser, 0, 0);

  byttVakt = false;
  cssClasses: string[] =[];

  vaktansvarligIds: number[][]= [];

  // array where index = userId
  usersIndexed: User[] = [];

  // todo: fix avdelsId to match administrator
  static avdelingsId = 2;

  monthShifts: any[] = [];

  daysShifts: Shift[][] = [];

  //  list of shifts that are in the system
  //  list of users that can work that day, with from and to time
  shiftsUsersCanWork: Shift[];
  shiftInForm: Shift;
  date: Date;
  allUsers: User[] = [];
  tempArr = new Array(24);
  months = ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'];

  ordinaryTimeAndOvertime = {};
  // 0 = HelsefagArbeider(30 %), 1 = Sykepleier(20%), 2 = Assistent
  // Three shifts a day
  percentageList = [[0,0,0], [0,0,0], [0,0,0]];
  shiftPercentageOk = [false, false, false];


  availabilityClicked = false;
  availabilityOk = false;

  restOfInit(users: User[]): void {
    this.allUsers = users.map(user =>  new User(user['brukerId'], null, user['stillingsBeskrivelse'], null, user['stillingsProsent'],
      null, null, user['fornavn'], user['etternavn'], user['epost'], user['avdelingId']

    ));
  }


  ngOnInit(): void {

    this.cssClasses['Helsefagarbeider'] = 'yellow-div';
    this.cssClasses['Assistent'] = 'green-div';
    this.cssClasses['Sykepleier'] = 'red-div';



    this.date = new Date();

    this.shiftInForm = new Shift(new User(null, null, null, null, null, null, null, 'Fornavn', 'Etternavn'), 0, 0);


    this.userService.getUsers1()
      .subscribe(
        (observable) => this.restOfInit(observable)
      );

    this.shiftsUsersCanWork = this.shiftService.getShiftsUsersCanWork(null);
    this.getShifts();


    this.setPercentageList();
    this.checkIfPercentageIsOk();



  }

  setForm(user: User): void {
    this.shiftInForm.user = user;
  }

  setPercentageList(): void {

    let stillingsIdStrings: string[] = [];
    stillingsIdStrings['Helsefagarbeider'] = 0;
    stillingsIdStrings['Assistent'] = 1;
    stillingsIdStrings['Sykepleier'] = 2;


    let currDate = this.date.getDate();
    for (let i in this.daysShifts[currDate]) {

      // 0: 2300-0700, 1: 0700-1500, 2: 1500-2300
      // todo: fix shift time handling, changes on db would make it easier
      //   todo: needs fix
      let shiftPeriod = this.daysShifts[currDate][i].toTime % 7;
      let stilling = stillingsIdStrings[this.usersIndexed[this.daysShifts[currDate][i].userId].stillingsBeskrivelse];
      this.percentageList[shiftPeriod][stilling] += 1;
    }
  }

  checkIfPercentageIsOk(): void {
    for(let i = 0; i < 3; i++) {
      let total = 0;
      for (let j = 0; j < 3; j++) {
        total += this.percentageList[i][j];
      }
      if (total <= 0) return;
      else {
        this.shiftPercentageOk[i] = ((this.percentageList[i][0] / total) >= 0.3 && (this.percentageList[i][0] / total) >= 0.2)
      }
    }
  }

  getShifts(): void {
    this.shiftService.getShifts(this.date).subscribe(
      (val) => this.setShifts(val)
    );


  }

  //todo: minimalize shift
  setShifts(shifts: any[]): void {

    this.monthShifts = shifts;
    for (let i = 0; i < 32; i++) {
      this.daysShifts[i] = [];
    }
    for (let i in this.monthShifts) {
      let date = new Date(this.monthShifts[i]['vakt']['tilTid']);
      let vaktAnsvarligId = this.monthShifts[i]['vakt']['vaktansvarligId'];
      // night = toTime = 0700, day = toTime = 1500, evening = toTime = 2300
      let toTimeSliced = this.monthShifts[i]['vakt']['tilTid'].slice(11, 13) as number;
      let shiftDescript = 7;
      if (toTimeSliced > 7 && toTimeSliced < 1500) shiftDescript = 15;
      else if (toTimeSliced > 1500) shiftDescript = 23;

      //todo: extremely hacky, should be fixed

      this.vaktansvarligIds[date.getDate()] = [];
      this.vaktansvarligIds[date.getDate()][shiftDescript] = vaktAnsvarligId;

      let brukerId = (this.monthShifts[i]['brukerId'] == 0) ? vaktAnsvarligId : this.monthShifts[i]['brukerId'];

      this.daysShifts[date.getDate()].push(
        new Shift(null, 0, shiftDescript, brukerId, vaktAnsvarligId ));
    }



    let daysInMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    this.allUsers.forEach(
      user =>
        this.usersIndexed[user.brukerId] = user
    );

    this.allUsers.forEach( user =>
      this.ordinaryTimeAndOvertime[user.brukerId] = [Math.round( (37.5 * daysInMonth / 7 ) * (user.stillingsProsent / 100)), 0]);
    // user.stillingsProsent / 100 * daysInMonth * 8), 0, user.stillingsProsent]);

    // todo: possibly fix the workaround for amount of hours a month


    this.daysShifts.forEach(
      shiftarr =>
        shiftarr.forEach( (shift) => this.ordinaryTimeAndOvertime[shift.userId][0] -= 8));


    // loop to display ordinary time, or overtime
    for (let i in this.ordinaryTimeAndOvertime) {
      if(this.ordinaryTimeAndOvertime[i][0] < 0) {
        this.ordinaryTimeAndOvertime[i][1] = this.ordinaryTimeAndOvertime[i][0] * -1;
        this.ordinaryTimeAndOvertime[i][0] = 0;
      }
    }

    //  sets availables
    this.shiftService.getAvailables(this.date).subscribe(res => this.setAvailables(res));

  }
  registerShift(): void {
    console.log(this.shiftInForm);
    let dateStringed = this.date.toISOString().substr(0, 10)+ 'T';
    console.log(dateStringed);
    this.shiftService.addShift(this.shiftInForm, dateStringed);

  }

  changeDate(year: number, month: number, date: number): void {

    let prevMonth = this.date.getMonth();
    let prevYear = this.date.getFullYear();

    if(this.date.getDate() != date) {
      this.date.setDate(date)
    }
    else if (this.date.getMonth() != month) {
      this.date.setMonth(month);
    }
    else if (this.date.getFullYear() != year) {
      this.date.setFullYear(year);
    }
    if (this.date.getFullYear() != prevYear || this.date.getMonth() != prevMonth){
      this.getShifts();

    }
    this.setPercentageList();
    this.checkIfPercentageIsOk();

  }

  setshiftInChangeShift(shift: Shift) {
    if(this.byttVakt) {
      console.log(shift);
      this.vaktForBytte1.user = this.usersIndexed[shift.userId];
      // this.vaktForBytte1.fromTime = shift.userId;
    }
  }

  switchShifts(): void {
    console.log(this.vaktForBytte1);
    console.log(this.vaktForBytte2);
  }

  setAvailables(availablesObs:any) {
    this.availables = [];

    for (let available of availablesObs) {
      if (this.availables[available['tilTid'].substr(0, 7)] == undefined) {
        this.availables[available['tilTid'].substr(0, 7)] = [];
      }

      this.availables[available['tilTid'].substr(0, 7)].push([this.usersIndexed[available['userId']], available['fraTid'], available['tilTid']]);
    }
    console.log(this.availables);
  }

  registerAvailability(val: any):void {
    let date1 = this.date.toISOString().substr(0, 11);
    let date2 = this.date.toISOString().substr(0, 11);
    console.log(date1);
    console.log(this.availableHour1);
    console.log(this.availableHour2);

    let returnObj = {'fraTid': (date1 + this.availableHour1), 'tilTid': (date2 + this.availableHour2), 'userId': this.getCurrentUser().brukerId};
    console.log(returnObj);
    console.log('here');
    // console.log(this.shiftService.addAvailability(returnObj));
    this.shiftService.addAvailability(returnObj).then(res => this.availabilityOk = res);

    this.availabilityClicked = true;
    console.log(this.availabilityOk);
    // this.shiftService.addAvailability();

  }

  check(): void {

    console.log(this.ordinaryTimeAndOvertime[1]);
    // console.log(new Date(this.availables[0][2]));
  }

  getCurrentUser(): User{
    return this.usersIndexed[1];
  }
}
