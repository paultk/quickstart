import {Http} from "@angular/http";
import {Shift} from "./shift";
import {User} from "./user";
import {Injectable} from "@angular/core";
import { USERS } from './mock-ansatte';

const shifts = [
  // new Shift(new User(1, 1, 1, 3232, 12, 121, false, 'fefe', 'fdg', 'sdffsd',3, 'testUser1'), 3, 12),
  new Shift(USERS[0], 3, 12),
  new Shift(USERS[1], 2, 15),
  new Shift(USERS[2], 3, 17),
];

@Injectable()
export class ShiftService {
  constructor(
    private http: Http
  ){}


  getShifts(date: Date): Shift[] {
      return shifts;
  }

  getShiftsUsersCanWork(date:  Date): Shift[] {
      return shifts;
}
}
