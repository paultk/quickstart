import {Component} from '@angular/core';

import {Sporsmaal} from './sporsmaal';

const SPORSMAAL : Sporsmaal [] = [
  { sprs: 'Hvordan kan jeg se mine vakter?', svar: 'For å se dine vakter må du trykke på knappen "Vaktliste" i sidebaren til høyere.' +
  ' Dette tar deg videre til en side med en timeplane for en gitt måned. Timeplanen inneholder alle ansattes vakter på de gitte datoene.'
 + 'Trykk på en ønsket dag i timeplanen for å kunne se en mer detaljert oversikt over hvem som jobber på den gitte datoen, ' +
  'hvor de jobber, og når de jobber.'},
  { sprs: 'Hvordan bytter man vakter?', svar:'For å kunne bytte vakt må man gå inn på "Vaktliste" for så å velge den datoen som du ikke ønsker å jobbe.' +
  ' Når den uønskede vakten er valgt klikker du på knappen "Bytt vakt". Dette bringer deg videre til et pop-up vindu, hvor du kan velge å gi bort vakten, eller bytte den mot en annen.' +
  'Velg blant ansatte å bytte med i rullegardin-knappen.'},
  { sprs: 'Hvordan se info om kollegaer?', svar: 'For å kunne se informasjon om dine kollegaer må du trykke på knappen "Brukerinfo" i sidebar-menyen til høyre.'
  + ' Du vil da bli presentert med en tabell over alle ansatte. Bruk søkefeltet for å finne spesifikke ansatte.' },
  { sprs: 'Hvordan se min profil?', svar: 'For å se brukerprofilen din må du trykke på knappen "Profil" som befinner seg oppe i høyre hjørne. Her kan du bytte passord ol.' },
  { sprs: 'Hva er varsler?', svar: '"Varseler" er meldinger som blir gitt til ansatte og administrator om bytting av vakter, registrering av overtid og fravære, ol. viktige bedskjeder.' },
  { sprs: 'Hvordan se mitt overtidsarbeid?', svar: 'neinei' },
  { sprs: 'Hvordan se mitt fravær?', svar: 'neinei' },
  { sprs: 'Hva er tilgjengelighet?', svar: 'Tilgjegnelighet er en oversikt over hvem som har muligheten til å jobbe ekstra utover sine egene vakter i løpet av en måned.' +
  ' For å se dette må man trykke på "Tilgjengelighet"-knappen i sidebar-menyen til høyre. Det er mulig å registrere tilgjengelighet ved å trykke på en valgt dato for så å trykke på knappen "registrer tilgjengelighet".' }
];

@Component({
  moduleId: module.id,
  selector: 'faq',
  templateUrl: 'faq.component.html',
  styleUrls: ['faq.component.css']
})

export class FaqComponent{

  sporsmaaler = SPORSMAAL;
  valgtSpr: Sporsmaal;

  onSelect(sporsmaal: Sporsmaal): void{
    this.valgtSpr = sporsmaal;
  }
  constructor(){}
}
