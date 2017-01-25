import {Http, Response} from "@angular/http";
import {Shift} from "./shift";
import {User} from "./user";
import {Injectable} from "@angular/core";
import { USERS } from './mock-ansatte';
import {Observable} from "rxjs";

const shifts = [
  // new Shift(new User(1, 1, 1, 3232, 12, 121, false, 'fefe', 'fdg', 'sdffsd',3, 'testUser1'), 3, 12),
  new Shift(USERS[0], 3, 12),
  new Shift(USERS[1], 2, 15),
  new Shift(USERS[2], 3, 17),
];

@Injectable()
export class ShiftService {
  constructor(
    private http: Http,
  ){}
  //

  // todo: fix avdelingsId
  getShifts(date: Date): Observable<any>{
    let url = `http://localhost:8080/vakt/all/month/${date.toISOString().substr(0, 7)}-01T12:00:00+01:00/2`;
    console.log(url);
    return this.http.get(url).map(
      (response: Response) => response.json()
    );
    // console.log(url);
    // console.log('ping');
      /*
      *
       getUsers(): Observable<User[]> {
       return this.http.get(this.UsersURL).map((response: Response) =>
       response.json());
       }*/
  }


  getShifts1(date: Date): void{
    let url = 'http://localhost:8080/vakt/all/month/2017-01-01T12:00:00+01:00/2';
    this.http.get(url).toPromise().then(
      (response) => console.log(response)
    );
    console.log(url);
    /*
     *
     getUsers(): Observable<User[]> {
     return this.http.get(this.UsersURL).map((response: Response) =>
     response.json());
     }*/
  }

  getShiftsUsersCanWork(date:  Date): Shift[] {
    return shifts;
  }

}
