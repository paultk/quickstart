import {Component, OnInit} from '@angular/core';

import { Fravaer } from './fravaer';
import {Vakt} from './vakt';
import {JsonTestClass} from "./json-test-class";
import {FravaerService} from "./fravaer.service";

@Component({
  moduleId: module.id,
  selector: 'my-fravaer',
  templateUrl: 'fravaer.component.html',
  styleUrls: [ 'fravaer.component.css' ]
})

export class FravaerComponent implements OnInit {
  constructor(private fravaerService: FravaerService) {}

  model = new Fravaer(23, 40, "Mandag", "Torsdag", "Dette er en kommentar");
  timeObject: any;

  fravaerListe: Fravaer[];

  vaktliste: Vakt[];
  selectedVakt: Vakt;

  fromTime = {hour: 6, minute: 0};
  toTime = {hour: 12, minute: 0};

  submitted = false;

  completeDateFrom = [""];
  completeDateTo = [""];

  getFravaer(): void {
    this.fravaerService
      .getFravaerliste()
      .then(fravaerListe => this.fravaerListe = fravaerListe);
  }

  onSelect(vakt: Vakt): void {
    this.selectedVakt = vakt;
  }

  testShit(): void {
    this.completeDateFrom[0] = this.timeObject.year.toString();
    this.completeDateFrom[1] = this.timeObject.month.toString();
    this.completeDateFrom[2] = this.timeObject.day.toString();
    this.completeDateFrom[3] = this.fromTime.hour.toString();
    this.completeDateFrom[4] = this.fromTime.minute.toString();

    this.completeDateTo[0] = this.timeObject.year.toString();
    this.completeDateTo[1] = this.timeObject.month.toString();
    this.completeDateTo[2] = this.timeObject.day.toString();
    this.completeDateTo[3] = this.toTime.hour.toString();
    this.completeDateTo[4] = this.toTime.minute.toString();

    for (let attr of this.completeDateFrom) {
      if (attr.length == 1) {
        this.completeDateFrom[this.completeDateFrom.indexOf(attr)] = "0" + attr;
      }
    }

    for (let attr of this.completeDateTo) {
      if (attr.length == 1) {
        this.completeDateTo[this.completeDateTo.indexOf(attr)] = "0" + attr;
      }
    }

    this.model.fraTid = this.completeDateFrom[0] + "-" + this.completeDateFrom[1] + "-" + this.completeDateFrom[2] +
      "T" + this.completeDateFrom[3] + ":" + this.completeDateFrom[4] + ":00";
    console.log(this.model.fraTid);

    this.model.tilTid = this.completeDateTo[0] + "-" + this.completeDateTo[1] + "-" + this.completeDateTo[2] +
      "T" + this.completeDateTo[3] + ":" + this.completeDateTo[4] + ":00";
    console.log(this.model.tilTid);

    this.getVakter();
  }

  getVakter(): void {
    this.fravaerService
      .getVaktByDate(this.model.fraTid.substr(0, 10))
      .then(vaktliste => this.vaktliste = vaktliste);
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.model);
    this.fravaerService.registerFravaer(this.model);
  }

  ngOnInit(): void {
    //this.getFravaer();
  }
}

