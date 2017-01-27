/**
 * Created by Knut on 27.01.2017.
 */

import {Component, OnInit} from "@angular/core";

import {User} from '../_models/user';
import {FravaerService} from '../_services/fravaer.service';
import {Fravaer} from '../_models/fravaer'
/*var $ = require("jquery");*/

@Component({
  moduleId: module.id,
  selector: 'my-fravaer-info',
  templateUrl: 'fravaer-info.component.html',
  styleUrls: ['fravaer-info.component.css']
})

export class FravaerInfoComponent implements OnInit {

  fravaer: Fravaer[];
  selectedFravaer: Fravaer;

  constructor(private fravaerService: FravaerService) {
  }

  getFravaer(): void {
    let response = this.fravaerService.getFravaerliste();
    Promise.resolve(response).then(fravaer => this.fravaer = fravaer).then(() => console.log(this.fravaer));
  }

  ngOnInit(): void {
    this.getFravaer();
  }
}
