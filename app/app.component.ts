import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
      <my-login></my-login>
      <!--<user-form></user-form>-->
`,

})
export class AppComponent  { name = 'Angular'; }
