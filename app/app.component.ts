import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <!--my-navigation hidden></my-navigation>-->
    <!--<calendar-component></calendar-component>-->
    <router-outlet name="navigation-outlet"></router-outlet>
    <!--<my-login></my-login>-->
  `,
})

export class AppComponent {
  name = 'Angular';
}

