import { Component } from '@angular/core';

import { User } from './user';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})

export class LoginComponent {
  model = new User('');

  tempUser = new User('1234');

  /*login(email: string, password: string): void {
    if (email === this.tempUser.email && password === this.tempUser.passord) {
      alert("Inlogging vellyket!");
    } else {
      alert("Feil brukernavn/passord.");
    }
  }*/
  login(): void { }

  onSubmit(): void {
    console.log("Boop");
  }
}
