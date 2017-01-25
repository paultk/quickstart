import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <!--my-navigation></my-navigation>-->
    <!--<my-login></my-login>-->
    <router-outlet></router-outlet>
    
  `,

})

export class AppComponent {
  name = 'Angular';
}

