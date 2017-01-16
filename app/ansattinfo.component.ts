/**
 * Created by Trym Todalshaug on 12/01/2017.
 */

import {Component, OnInit} from "@angular/core";

import {Ansatt} from './ansatt';
import {AnsattService} from './ansatt.service';

@Component({
  moduleId: module.id,
  selector: 'my-ansattinfo',
  templateUrl: 'ansattinfo.component.html',
  styleUrls: ['ansattinfo.component.css']
})

export class AnsattinfoComponent implements OnInit{
  ansatte: Ansatt[];
  selectedAnsatt: Ansatt;

  constructor (
    private ansattService: AnsattService,
  ) {}

  getAnsatte(): void {
    this.ansattService.getAnsatte().then(ansatte => this.ansatte = ansatte);
  }

  ngOnInit(): void {
    this.getAnsatte();
  }
}
