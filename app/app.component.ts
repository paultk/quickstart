import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1>
 <my-add-user></my-add-user>
`,

})
export class AppComponent  { name = 'Angular'; }
