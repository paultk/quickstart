import {Component} from '@angular/core';

import {Sporsmaal} from './sporsmaal';

const SPORSMAAL : Sporsmaal [] = [
  { sprs: 'Hva faen?', svar: 'yyoyo'},
  { sprs: 'Hvordan bruke denne nettsiden?', svar:'okok'},
  { sprs: 'Hva er det her?', svar: 'neinei' }
];

@Component({
  moduleId: module.id,
  selector: 'faq',
  templateUrl: 'faq.component.html',
  // styleUrls: ['faq.component.css']
})

export class FaqComponent{

  sporsmaaler = SPORSMAAL;
  valgtSpr: Sporsmaal;

  onSelect(sporsmaal: Sporsmaal): void{
    this.valgtSpr = sporsmaal;
  }
  constructor(){}
}
