import { Component } from '@angular/core';

import { User } from './user';

@Component({
  moduleId: module.id,
  selector: 'my-login',
  templateUrl: 'login.component.html',
  styleUrls: [ 'login.component.css' ]
})

export class LoginComponent {
  model = new User(1);
  loading = false;
  returnUrl: string;
  tempUser = new User(1);



  /*login(email: string, password: string): void {
    if (email === this.tempUser.email && password === this.tempUser.plaintextPassord) {
      alert("Inlogging vellyket!");
    } else {
      alert("Feil brukernavn/plaintextPassord.");
    }
  }*/
  login(): void { }

  onSubmit(): void {
    console.log("Boop");
  }
}
